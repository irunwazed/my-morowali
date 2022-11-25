import db from "../../models";

const table = db.penduduk;

export default class DataController {

	static async getPendudukByNIK(req, res) {
		let nik = req.params.nik;
		try{
			let data = await db.penduduk.find({nik: nik});
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
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
						as: 'keluarga_penduduk',
					},
				},
				{
					$lookup:{
						from: 'penduduks',
						localField: 'keluarga_penduduk.penduduk_id',
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
						as: 'anggota_keluarga'
					},
				}, 
				{ $match: { no_kk: no_kk } }
			]);

			// return res.send(data);
			if(data[0]){

				let pendidikan = ['', 'Tidak punya ijazah', 'SD', 'SMP', 'SMA', 'S1', 'S2', 'S3'];
				let status_pernikahan = ['', 'Belum Menikah', 'Menikah', 'Duda', 'Janda'];
				let fisik = ['', 'Lainnya', 'Sehat', 'Cacat'];
				let anggota = [];
				data[0].anggota_keluarga.forEach(e => {
					anggota.push({
						nik: e.nik,
						nama: e.nama,
						lahir: e.lahir,
						alamat: e.alamat,
						fisik: {
							kondisi: fisik[e.fisik.fisik_id],
							keterangan: e.fisik.keterangan,
						},
						status_pernikahan: status_pernikahan[e.status_pernikahan],
						jenis_kelamin: e.jk=='P'?'Perempuan':'Laki - Laki',
						pendidikan_terakhir: pendidikan[e.pendidikan_id],
						penyakit: {
							nama: e.penyakit_diderita.nama,
							keterangan: e.penyakit.keterangan,
						},
						hidup: e.hidup?'Ya':'Tidak',
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
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getProvinsi(req, res) {
		try{
			let data = await db.wil_provinsi.find({  });
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
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKabupaten(req, res) {
		try{
			let data = await db.wil_kabupaten.find({  });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKabupatenKode(req, res) {
		var kode = req.params.kode?req.params.kode:0;
		try{
			let data = await db.wil_kabupaten.find({ kode: kode });
			if(data[0])return res.send({ statusCode: 200, data: { kode: data[0].kode, nama: data[0].nama } });
			else return res.status(404).send({ statusCode: 404, message: 'data not found' });
		}catch(err){
			return res.status(500).send({
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKecamatan(req, res) {
		try{
			let data = await db.wil_kecamatan.find({  });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
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
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKelurahanByKode(req, res) {
		var kode = req.params.kode?req.params.kode:0;
		try{
			let data = await db.wil_desa.find({ kode: kode });
			if(data[0])return res.send({ statusCode: 200, data: { kode: data[0].kode, nama: data[0].nama, level: data[0].level } });
			else return res.status(404).send({ statusCode: 404, message: 'data not found' });
		}catch(err){
			return res.status(500).send({
				message: err.message || "Data is invalid",
			});
		}
	}

	static async getKelurahanByKodeKecamatan(req, res) {
		var kode = req.params.kode?req.params.kode:0;
		try{
			let data = await db.wil_desa.find({ kode: {$gt: (kode*1000), $lt: (kode*1000 + 999)} });
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				message: err.message || "Data is invalid",
			});
		}
	}
}