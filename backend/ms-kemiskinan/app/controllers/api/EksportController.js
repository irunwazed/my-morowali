const db = require("../../models");
const reader = require('xlsx');

exports.controller = class EksportController {

	static nikArr = [''];

	static async penduduk(req, res) {

		try{
			let excel = req.files[0];

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

			await db.penduduk.deleteMany({}) 
			await db.keluarga.deleteMany({}) 
			await db.keluarga_penduduk.deleteMany({}) 
			await EksportController.insert(data, 0);
			
			let tes = await db.penduduk.find({});


			console.log('insert data penduduk'+tes.length);

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
		if(data[idx]){
	
			let hubkel = { 'Kepala Keluarga': 1, 'Istri': 2, 'Anak': 3, 'Lainnya': 4  }
	
			let penduduk = await db.penduduk.insertMany([EksportController.setPenduduk(data[idx])]);
			let penduduk_id = penduduk[0]._id;
			// console.log(EksportController.nikArr);
			
			let no_kk = data[idx]['ID Keluarga P3KE'];
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
	
			return EksportController.insert(data, (idx+1));
		}
		return false;
	}

	static setPenduduk(res){
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
	
		let nik = res['NIK']?res['NIK']:'99'+Math.floor(Math.random()*100000000000000);
		while(EksportController.nikArr.includes(nik)){
			nik = '99'+Math.floor(Math.random()*100000000000000);
		}
		EksportController.nikArr.push(nik);
	
		return {
			nama: res['Nama'],
			nik: nik,
			jk: res['Jenis Kelamin']=='Laki-laki'?'L':'P',
			lahir:{
					tempat: '',
					tanggal: tgl,
			},
			alamat: {
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

}