import db from "../../../models";
import { validationResult, check } from "express-validator";
import paginate from '../../../libraries/paginate';

const table = db.pekerjaan;

exports.validate = {
  store: [ 
		check('nama', 'please insert nama').exists(),
		check('keterangan', 'please insert keterangan').exists(),
	],
}

export default class PekerjaanController {

	static async getData(req, res) {
		let nama = new RegExp(req.query.nama);
		var condition = {nama: {$regex: nama, $options: 'i'}};
		try{
			let result = await paginate.find(req, 'pekerjaan', condition);
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

		var data;
		try{
			let nama = req.body.nama;
			let keterangan = req.body.keterangan;

			data = await table.create({
				nama: nama,
				keterangan: keterangan,
			});

		}catch(err){
			console.log(err);
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving data.",
			});
		}
		return res.send({
			statusCode: 200,
			message: 'Data was inserted successfully.',
			data: data
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
		
		let nama = req.body.nama;
		let keterangan = req.body.keterangan;
		let id = req.params.id;

		try{
			let data = await table.findByIdAndUpdate(id, {
					nama,
					keterangan,
				}, { useFindAndModify: false });
			if (!data) {
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