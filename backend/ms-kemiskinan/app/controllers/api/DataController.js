const db = require("../../models");

const table = db.penduduk;

exports.controller = class DataController {
	
	static queryPenduduk(){
		return [
			{
				$lookup: {
					from: 'penyakits',
					localField: 'penyakit.penyakit_id',
					foreignField: '_id',
					as: 'penyakit_diderita',
				},
			},
			{
				$lookup: {
					from: 'penduduk_pekerjaans',
					localField: '_id',
					foreignField: 'penduduk_id',
					pipeline: [
						{
							$lookup: {
								from: 'pekerjaans',
								localField: 'pekerjaan_id',
								foreignField: '_id',
								as: 'pekerjaan',
							},
						},
						{ $unwind: "$pekerjaan" },
						{ $project: {
							pekerjaan_id: '$pekerjaan_id',
							pekerjaan_nama: '$pekerjaan.nama',
							gaji: '$gaji',
							keterangan: '$keterangan',
						} }
					],
					as: 'pekerjaan',
				},
			},
		];
	}

	static async getPendudukByNIK(req, res) {
		let nik = req.params.nik;
		try{

			let query = DataController.queryPenduduk();

			let data = await db.penduduk.aggregate([... query,
				{ $match: { nik: nik } },
        {
          $project: {
            _id: '$_id',
            nama: '$nama',
            nik: '$nik',
            jk: '$jk',
            agama: '$agama',
            lahir: '$lahir',
            alamat: '$alamat',
            status_pernikahan: '$status_pernikahan',
            fisik: '$fisik',
            pendidikan_id: '$pendidikan_id',
            penyakit: {
              penyakit_id: '$penyakit.penyakit_id',
              nama: { $arrayElemAt: ['$penyakit_diderita.nama', 0] },
              keterangan: '$penyakit.keterangan',
            },
            pekerjaan: '$pekerjaan',
            hidup: '$hidup',
          }
        }
			]);
			if(data[0]){
				let pendidikan = ['', 'Tidak punya ijazah', 'SD', 'SMP', 'SMA', 'S1', 'S2', 'S3'];
				let status_pernikahan = ['', 'Belum Menikah', 'Menikah', 'Duda', 'Janda'];
				let fisik = ['', 'Lainnya', 'Sehat', 'Cacat'];
				let agama = ['', 'Islam', 'Kristen', 'Khatolik', 'Hindu', 'Buddha', 'Konghucu']; 
				
				return res.send({statusCode: 200, data: {
					_id: data[0]._id,
					nama: data[0].nama,
					nik: data[0].nik,
					jenis_kelamin: data[0].jk=='P'?'Perempuan':'Laki - Laki',
					lahir: data[0].lahir,
					agama: agama[data[0].agama],
					alamat: data[0].alamat,
					fisik: {
						kondisi: fisik[data[0].fisik.fisik_id],
						keterangan: data[0].fisik.keterangan,
					},
					status_pernikahan: status_pernikahan[data[0].status_pernikahan],
					pendidikan_terakhir: pendidikan[data[0].pendidikan_id],
					penyakit: {
						nama: data[0].penyakit.nama,
						keterangan: data[0].penyakit.keterangan,
					},
					pekerjaan: data[0].pekerjaan.map(e => { return { nama: e.pekerjaan_nama, gaji: e.gaji, keterangan: e.keterangan, } }),
					hidup: data[0].hidup?'Ya':'Tidak',
				}});
			}else return res.status(404).send({statusCode: 404, message: 'data not found'});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getPendudukBySearch(req, res) {
		try{

			let search = req.query.search?req.query.search:'';
			let query = DataController.queryPenduduk();
			console.log(search);

			let data = await db.penduduk.aggregate([... query,
        {
          $project: {
            _id: '$_id',
            nama: '$nama',
            nik: '$nik',
            jk: '$jk',
            agama: '$agama',
            lahir: '$lahir',
            alamat: '$alamat',
            status_pernikahan: '$status_pernikahan',
            fisik: '$fisik',
            pendidikan_id: '$pendidikan_id',
            penyakit: {
              penyakit_id: '$penyakit.penyakit_id',
              nama: { $arrayElemAt: ['$penyakit_diderita.nama', 0] },
              keterangan: '$penyakit.keterangan',
            },
            pekerjaan: '$pekerjaan',
            hidup: '$hidup',
          }
        },
				{ $match: {
					$or: [
						{ nik: { $regex: new RegExp(search), $options: "i" }, },
						{ nama: { $regex: new RegExp(search), $options: "i" }, },
					]
				} },
			]);
			return res.status(200).send({statusCode: 404, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKeluargaByNoKK(req, res) {
		let no_kk = req.params.no_kk;
		try{
			let data = await db.keluarga.aggregate([
				{
					$lookup:{
						from: 'keluarga_penduduks',
						localField: '_id',
						foreignField: 'keluarga_id',
						pipeline: [
							{
								$lookup:{
									from: 'penduduks',
									localField: 'penduduk_id',
									foreignField: '_id',
									pipeline: [
										{
											$lookup: {
												from: 'penyakits',
												localField: 'penyakit.penyakit_id',
												foreignField: '_id',
												as: 'penyakit_diderita',
											},
										},
										{
											$lookup: {
												from: 'penduduk_pekerjaans',
												localField: '_id',
												foreignField: 'penduduk_id',
												pipeline: [
													{
														$lookup: {
															from: 'pekerjaans',
															localField: 'pekerjaan_id',
															foreignField: '_id',
															as: 'pekerjaan',
														},
													},
													{ $unwind: "$pekerjaan" },
													{ $project: {
														pekerjaan_id: '$pekerjaan_id',
														pekerjaan_nama: '$pekerjaan.nama',
														gaji: '$gaji',
														keterangan: '$keterangan',
													} }
												],
												as: 'pekerjaan',
											},
										},
									],
									as: 'penduduk'
								},
							}, 
							{ $unwind: "$penduduk" },
						],
						as: 'anggota_keluarga',
					},
				},
				{ $match: { no_kk: no_kk } }
			]);

			// return res.send(data);
			if(data[0]){

				let pendidikan = ['', 'Tidak punya ijazah', 'SD', 'SMP', 'SMA', 'S1', 'S2', 'S3'];
				let status_pernikahan = ['', 'Belum Menikah', 'Menikah', 'Duda', 'Janda'];
				let fisik = ['', 'Lainnya', 'Sehat', 'Cacat'];
				let hubkel = ['', 'Istri / Suami', 'Anak', 'Wali', 'Lainnya'];
				let anggota = [];
				data[0].anggota_keluarga.forEach(e => {
					anggota.push({
						nik: e.penduduk.nik,
						nama: e.penduduk.nama,
						kepala_keluarga: e.kepala?'Ya':'Tidak',
						hubungan_keluarga: hubkel[e.level],
						lahir: e.penduduk.lahir,
						alamat: e.penduduk.alamat,
						fisik: {
							kondisi: fisik[e.penduduk.fisik.fisik_id],
							keterangan: e.penduduk.fisik.keterangan,
						},
						status_pernikahan: status_pernikahan[e.penduduk.status_pernikahan],
						jenis_kelamin: e.penduduk.jk=='P'?'Perempuan':'Laki - Laki',
						pendidikan_terakhir: pendidikan[e.penduduk.pendidikan_id],
						penyakit: {
							nama: e.penduduk.penyakit_diderita.nama,
							keterangan: e.penduduk.penyakit.keterangan,
						},
						hidup: e.penduduk.hidup?'Ya':'Tidak',
					});
				});

				return res.send({ statusCode: 200, data: { 
					no_kk: data[0].no_kk,
					kb: data[0].kb,
					anggota_keluarga: anggota,
				}});
			}
			else return res.status(404).send({ statusCode: 404, message: 'data not found' });
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async beranda(req, res){
		try{
			let year = new Date().getFullYear();
			let jumPendudukPerKec = await db.penduduk.aggregate([ 
				{ $group : {_id: {$toInt: "$alamat.kecamatan_kode"} , count:{$sum:1}}}, 
				{
					$lookup: {
						from: 'wil_kecamatans',
						localField: '_id',
						foreignField: 'kode',
						as: 'kecamatan',
					},
				},
				{ $unwind: "$kecamatan" },
				{ $project: {
					kode: "$kecamatan.kode",
					nama: "$kecamatan.nama",
					jum_penduduk: "$count",
				} }
			]);
			let jumPenduduk = await db.penduduk.count({});
			let jumKeluarga = await db.keluarga.count({});
			let jumBantuan = await db.penduduk_bantuan.count({});
			let jumBantuanTahunIni = await db.penduduk_bantuan.count({tahun: year});
			let jumDataKesejahteraan = await db.keluarga_kesejahteraan.count({});
			let jumDataKesejahteraanTahunan = await db.keluarga_kesejahteraan.aggregate([
				{ $group : {_id: { tahun: {$toInt: "$tahun"}, status_kesejahteraan: '$status_kesejahteraan' },  count:{$sum:1}}}, 
				{ $project: {
					tahun: '$_id.tahun',
					status_kesejahteraan: '$_id.status_kesejahteraan',
					jumlah: '$count',
				} }
			]);
			let jumDataKesejahteraanTahunIni = await db.keluarga_kesejahteraan.count({tahun: year});
			
			return res.send({
				statusCode: 200,
				data: {
					jumPenduduk: jumPenduduk,
					jumPendudukPerKec: jumPendudukPerKec,
					jumKeluarga: jumKeluarga,
					jumBantuan: jumBantuan,
					jumBantuanTahunIni: jumBantuanTahunIni,
					jumDataKesejahteraan: jumDataKesejahteraan,
					jumDataKesejahteraanTahunan: jumDataKesejahteraanTahunan,
					jumDataKesejahteraanTahunIni: jumDataKesejahteraanTahunIni,
				},
			});

		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getProvinsi(req, res) {
		try{
			let data = await db.wil_provinsi.find({  });
			data = data.map(e => { return {kode: e.kode, nama: e.nama} })
			return res.send({ statusCode: 200, data: data });
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getProvinsiKode(req, res) {
		var kode = req.params.kode?req.params.kode:0;
		try{
			let data = await db.wil_provinsi.find({ kode: kode });
			if(data[0])return res.send({ statusCode: 200, data: { kode: data[0].kode, nama: data[0].nama } });
			else return res.status(404).send({ statusCode: 404, message: 'data not found' });
			
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKabupaten(req, res) {
		try{
			let data = await db.wil_kabupaten.find({});
			data = data.map(e => { return {kode: e.kode, level: e.level==1?'Kota':'Kabupaten', nama: e.nama} })
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKabupatenKode(req, res) {
		var kode = req.params.kode?req.params.kode:0;
		try{
			let data = await db.wil_kabupaten.find({ kode: kode });
			if(data[0])return res.send({ statusCode: 200, data: { kode: data[0].kode, level: data[0].level==1?'Kota':'Kabupaten', nama: data[0].nama } });
			else return res.status(404).send({ statusCode: 404, message: 'data not found' });
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKecamatan(req, res) {
		try{
			let data = await db.wil_kecamatan.find({});
			data = data.map(e => { return {kode: e.kode, nama: e.nama} })
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKecamatanByKode(req, res) {
		var kode = req.params.kode?req.params.kode:0;
		try{
			let data = await db.wil_kecamatan.find({ kode: kode });
			if(data[0])return res.send({ statusCode: 200, data: { kode: data[0].kode, nama: data[0].nama } });
			else return res.status(404).send({ statusCode: 404, message: 'data not found' });
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKelurahanByKode(req, res) {
		var kode = req.params.kode?req.params.kode:0;
		try{
			let data = await db.wil_desa.find({ kode: kode });
			if(data[0])return res.send({ statusCode: 200, data: { kode: data[0].kode, level: data[0].level==1?'Kelurahan':'Desa', nama: data[0].nama } });
			else return res.status(404).send({ statusCode: 404, message: 'data not found' });
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKelurahanByKodeKecamatan(req, res) {
		var kode = req.params.kode?req.params.kode:0;
		try{
			let data = await db.wil_desa.find({ kode: {$gt: (kode*1000), $lt: (kode*1000 + 999)} });
			data = data.map(e => { return {kode: e.kode, level: e.level==1?'Kelurahan':'Desa', nama: e.nama} })
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKIAtap(req, res){
		try{
			let data = await db.ki_atap.find({}).sort({ bobot: 'desc' });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKIBahanBakar(req, res){
		try{
			let data = await db.ki_bahan_bakar.find({}).sort({ bobot: 'desc' });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKIDinding(req, res){
		try{
			let data = await db.ki_dinding.find({}).sort({ bobot: 'desc' });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKIJamban(req, res){
		try{
			let data = await db.ki_jamban.find({}).sort({ bobot: 'desc' });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKILantai(req, res){
		try{
			let data = await db.ki_lantai.find({}).sort({ bobot: 'desc' });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKIPenerangan(req, res){
		try{
			let data = await db.ki_penerangan.find({}).sort({ bobot: 'desc' });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKIRumah(req, res){
		try{
			let data = await db.ki_rumah.find({}).sort({ bobot: 'desc' });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKISumberAir(req, res){
		try{
			let data = await db.ki_sumber_air.find({});
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data is invalid",
			});
		}
	}
	

}