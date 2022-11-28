import db from "../../models";

const table = db.penduduk;

export default class DataController {

	static async getPendudukByNIK(req, res) {
		let nik = req.params.nik;
		try{
			let data = await db.penduduk.aggregate([
				{
					$lookup: {
						from: 'penyakits',
						localField: 'penyakit.penyakit_id',
						foreignField: '_id',
						as: 'penyakit_diderita',
					},
				},
				{ $unwind: "$penyakit_diderita" },
				{ $match: { nik: nik } }
			]);
			if(data[0]){
				let pendidikan = ['', 'Tidak punya ijazah', 'SD', 'SMP', 'SMA', 'S1', 'S2', 'S3'];
				let status_pernikahan = ['', 'Belum Menikah', 'Menikah', 'Duda', 'Janda'];
				let fisik = ['', 'Lainnya', 'Sehat', 'Cacat'];
				// return res.send(data);
				return res.send({statusCode: 200, data: {
					nik: data[0].nik,
					nama: data[0].nama,
					lahir: data[0].lahir,
					alamat: data[0].alamat,
					fisik: {
						kondisi: fisik[data[0].fisik.fisik_id],
						keterangan: data[0].fisik.keterangan,
					},
					status_pernikahan: status_pernikahan[data[0].status_pernikahan],
					jenis_kelamin: data[0].jk=='P'?'Perempuan':'Laki - Laki',
					pendidikan_terakhir: pendidikan[data[0].pendidikan_id],
					penyakit: {
						nama: data[0].penyakit_diderita.nama,
						keterangan: data[0].penyakit.keterangan,
					},
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
										{ $unwind: "$penyakit_diderita" },
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

	static async getProvinsi(req, res) {
		try{
			let data = await db.wil_provinsi.find({  });
			data = data.map(e => { return {kode: e.kode, nama: e.nama} })
			return res.send({ statusCode: 200, data: data });
		}catch(err){
			return res.status(500).send({
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
}