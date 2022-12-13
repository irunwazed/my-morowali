const db = require("../../models");
const reader = require('xlsx');

exports.controller = class EksportController {

	static nikArr = [''];

	static async penduduk(req, res) {

		try{
			let excel = req.files[0];
			let setDelete = req.body.delete=='true'?true:false;

			console.log(excel)


			console.log('proses load data keluarga')
			const file = reader.readFile(excel.path)

			let data = []

			const sheets = file.SheetNames
				
			for(let i = 0; i < sheets.length; i++)
			{
				const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
				temp.forEach((res) => {
						data.push(res)
				})
			}
				
			console.log('proses input keluarga')


			if(setDelete){
				console.log('hapus')
				await db.penduduk.deleteMany({}) 
				await db.keluarga.deleteMany({}) 
				await db.keluarga_penduduk.deleteMany({}) 
			}else{
				console.log('tidak hapus')
			}

			await EksportController.insert(data, 0);
			
			let tes = await db.penduduk.find({});
			console.log('insert data penduduk '+tes.length);

			let api = {
				statusCode: 200,
				data: [],
			};
			return res.send(api);

		}catch(err){
			return res.status(500).send({ statusCode: 500, message: err });
		}
	}

	static async insert(data, idx){

		try{
			if(data[idx]){

				
				let no_kk = data[idx]['ID Keluarga P3KE'];
				
				let tmp = await db.penduduk.find({ nama: data[idx]['Nama'], no_kk: no_kk });
				if(tmp.length > 0){
					return await EksportController.insert(data, (idx+1));
				}
	
				let dataInput = await EksportController.setPenduduk(data[idx]);
	
	
				let hubkel = { 'Kepala Keluarga': 1, 'Istri': 2, 'Anak': 3, 'Lainnya': 4  }
		
				let penduduk = await db.penduduk.insertMany([dataInput]);
				let penduduk_id = penduduk[0]._id;
				// console.log(EksportController.nikArr);
				
				let tmpKeluarga = {no_kk: no_kk};
		
		
				let keluarga = await db.keluarga.find(tmpKeluarga);
				let keluarga_id;
				if(keluarga.length == 0){
					let tmp = await db.keluarga.insertMany([tmpKeluarga]);
					keluarga_id = tmp[0]._id;
				}else{
					keluarga_id = keluarga[0]._id;
				}
				
				let tmpHubKel = {
					keluarga_id: keluarga_id,
					penduduk_id: penduduk_id,
					level: hubkel[data[idx]['Hubungan dengan Kepala Keluarga']],
				};
		
				if(hubkel[data[idx]['Hubungan dengan Kepala Keluarga']] == 1){
					tmpHubKel['kepala'] = true;
				}
				
				await db.keluarga_penduduk.insertMany([tmpHubKel])
				// console.log(idx);
		
				return await EksportController.insert(data, (idx+1));
			}
		}catch(err){
			console.log(err);
			console.log(data[idx]);
			console.log(data[idx]['NIK'])
		}
		
		return false;
	}

	static async setPenduduk(res){
		let tgl = res['Tanggal Lahir'].split(" ");
	
		tgl = tgl[0]?tgl[0]:'00/00/0000';
		tgl = tgl.split("/");
	
		let month = tgl[0].length==1?'0'+tgl[0]:tgl[0];
		let day = tgl[1].length==1?'0'+tgl[1]:tgl[1];
		let year = tgl[2];
		tgl = year+'-'+month+"-"+day;
	
		let kawin = { 'Belum Kawin': 1, 'Cerai Hidup': 2, 'Cerai Mati': 3, 'Kawin': 4}; 
		let pendidikan = {'Tidak/belum sekolah': 1, 'Tidak tamat SD/sederajat': 2, 'Siswa SD/sederajat': 3, 'Tamat SD/sederajat': 4, 'Siswa SMP/sederajat': 5, 'Tamat SMP/sederajat': 6, 'Siswa SMA/sederajat': 7, 'Tamat SMA/sederajat': 8, 'Mahasiswa Perguruan Tinggi': 9, 'Tamat Perguruan Tinggi': 10}; 
		let hubkel = { 'Kepala Keluarga': 1, 'Istri': 2, 'Anak': 3, 'Lainnya': 4,  };


	
		let nik = (res['NIK']!='' && res['NIK'] != undefined)?res['NIK']:'99'+Math.floor(Math.random()*100000000000000);
		// nik = (nik == undefined) ?'99'+Math.floor(Math.random()*100000000000000):nik;
		let tmp = await db.penduduk.find({nik: nik});
		while(tmp.length > 0){
			nik = '99'+Math.floor(Math.random()*100000000000000);
			tmp = await db.penduduk.find({nik: nik});
		}

		let kec = await db.wil_kecamatan.find({nama: res['Kecamatan'].toUpperCase()});
		let kel = await db.wil_desa.find({nama: EksportController.setName(res['Desa/Kelurahan'])});
	
		return {
			nama: res['Nama'],
			nik: nik,
			jk: res['Jenis Kelamin']=='Laki-laki'?'L':'P',
			lahir:{
					tempat: '',
					tanggal: tgl,
			},
			alamat: {
				provinsi_kode: '72',
				kabupaten_kode: '7203',
				kecamatan_kode: kec[0]?kec[0].kode.toString():'',
				kelurahan_kode: kel[0]?kel[0].kode.toString():'',
				provinsi_nama: res['Provinsi'],
				kabupaten_nama: res['Kabupaten/Kota'],
				kecamatan_nama: res['Kecamatan'],
				kelurahan_nama: res['Desa/Kelurahan'],
				alamat_nama: res['Alamat'],
			},
			status_pernikahan: kawin[res['Status Kawin']],
			pendidikan_id: pendidikan[res['Pendidikan']],
			hidup: true,
			data: {
				nik: res['NIK'],
				p3ke_individu_id: res['ID Individu'],
				p3ke_keluarga_id: res['ID Keluarga P3KE'],
				dukcapil_padan: res['Padan Dukcapil'],
			}
		};
	}

	static setName(string){
		string = string.toLowerCase();
		let arr = string.split(" ");
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
		}
		return arr.join(" ");
	}

}