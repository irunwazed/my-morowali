const db = require("../../models");
const { validationResult, check } = require("express-validator");
const paginate = require("../../libraries/paginate");

const table = db.penduduk_pekerjaan;

exports.validate = {
  store: [ 
		check('penduduk_id', 'penduduk_id tidak ada').exists(),
		check('pekerjaan_id', 'pekerjaan_id tidak ada').exists(),
		check('gaji', 'gaji tidak ada').exists().isFloat(), 
		check('keterangan', 'keterangan tidak ada').exists(),
	],
}

exports.controller = class PendudukPekerjaanController {


	static async getData(req, res) {
		var condition = {};
		try{
			let data = await paginate.find(req, 'penduduk_pekerjaan', condition);
			return res.send(data);
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
			else return res.send({statusCode: 200, data: data});
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

		try{
			let penduduk_id = req.body.penduduk_id;
			let pekerjaan_id = req.body.pekerjaan_id;
			let gaji = req.body.gaji;
			let keterangan = req.body.keterangan;
			let nik = '';
			
			let dataPenduduk = await db.penduduk.findById(penduduk_id);
			if(!dataPenduduk) return res.status(404).send({ statusCode: 400, message: 'penduduk not found' });
			
			let dataInput = {
				pekerjaan_id: pekerjaan_id,
				gaji: gaji,
				keterangan: keterangan,
			};

			if(req.params.id){
				let id = req.params.id;
				let data = await table.findByIdAndUpdate(id, dataInput, {useFindAndModify: false});
				if (!data) {
					return res.status(404).send({
						statusCode: 404,
						message: `Cannot update data with id=${id}. Maybe data was not found!`,
					});
				}
				return res.send({
					statusCode: 200,
					message: "Data was updated successfully.",
				});
			}else{
				dataInput['penduduk_id'] = penduduk_id;
				dataInput['nik'] = dataPenduduk.nik;
				await table.create(dataInput);
				return res.send({
					statusCode: 200,
					message: 'Data was inserted successfully.',
				});
			}
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving data.",
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