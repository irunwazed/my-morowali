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