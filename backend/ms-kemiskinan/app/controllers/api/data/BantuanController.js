const db = require("../../../models");
const { validationResult, check } = require("express-validator");
const paginate = require("../../../libraries/paginate");
const services = require("../../../libraries/api-services");

const table = db.bantuan;

exports.validate = {
  store: [ 
		check('nama', 'please insert nama').exists(),
		check('opd_kode', 'please insert OPD').exists(),
		check('jenis', 'please insert jenis').exists(),
		check('keterangan', 'please insert keterangan').exists(),
	],
}

exports.controller = class BantuanController {

	static async getData(req, res) {
		let nama = new RegExp(req.query.nama);
		var condition = {nama: {$regex: nama, $options: 'i'}};
		try{
			let result = await paginate.find(req, 'bantuan', condition);
			return res.send(result);
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving data.",
			});
		}
	}

	static async getOneData(req, res) {
		try{
			let id = req.params.id;
			let data = await table.findById(id);
			if (!data) return res.status(400).send({
				statusCode: 400,
				message: "Not found data with id " + id,
			});
			else return res.send({ statusCode: 200, data: data });
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving data.",
			});
		}
	}

	static async store(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				statusCode: 422,
				errors: errors.array(),
			});
		}

		var result;
		try{
			let nama = req.body.nama;
			let keterangan = req.body.keterangan;
			let opd_kode = req.body.opd_kode;
			let jenis = req.body.jenis;
			
			let opd = await services.getOPDByKode(req, opd_kode);
			
			let data = {
				nama: nama,
				opd: {
					kode: opd.kode,
					nama: opd.nama,
				},
				jenis: jenis,
				keterangan: keterangan,
			};
			if(opd.kode)data['opd'] = opd;

			result = await table.create(data);

		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving data.",
			});
		}
		return res.send({
			statusCode: 200,
			message: 'Data was inserted successfully.',
			data: result
		});
	}

	static async update(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				statusCode: 422,
				errors: errors.array(),
			});
		}

		try{
			let nama = req.body.nama;
			let keterangan = req.body.keterangan;
			let opd_kode = req.body.opd_kode;
			let id = req.params.id;
			let jenis = req.body.jenis;

			let opd = await services.getOPDByKode(req, opd_kode);
			let data = {
				nama: nama,
				keterangan: keterangan,
				jenis: jenis,
			};
			if(opd.kode)data['opd'] = opd;
			
			let result = await table.findByIdAndUpdate(id, data, { useFindAndModify: false });

			if (!result) {
				return res.status(404).send({
					statusCode: 404,
					message: `Cannot update data with id=${id}. Maybe data was not found!`,
				});
			}else{
				return res.send({
					statusCode: 200,
					message: "Data was updated successfully."
				});
			}
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: "Error updating data with id=" + id,
			});
		}

	}

	static async delete(req, res) {
		let id = req.params.id;
		try{
			let data = await table.findByIdAndRemove(id);
			
			if (!data) {
				return res.status(400).send({
					statusCode: 400,
					message: `Cannot delete data with id=${id}. Maybe data was not found!`,
				});
			} else {
				return res.send({
					statusCode: 200,
					message: "data was deleted successfully!",
				});
			}
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: "Could not delete data with id=" + id,
			});
		}
	}

}