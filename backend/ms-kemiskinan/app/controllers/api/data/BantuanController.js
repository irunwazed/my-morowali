import db from "../../../models";
import {
	validationResult
} from "express-validator";
import { check } from 'express-validator';
import services from "../../../libraries/api-services"

const table = db.bantuan;

exports.validate = {
  store: [ 
		check('nama', 'please insert nama').exists(),
		check('opd_kode', 'please insert OPD').exists(),
		check('keterangan', 'please insert keterangan').exists(),
	],
}

export default class BantuanController {

	static async getData(req, res) {
		let nama = new RegExp(req.query.nama);
		var condition = {nama: {$regex: nama, $options: 'i'}};
		try{
			let data = await table.find(condition);
			return res.send({ statusCode: 200, data: data });
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

		var result;
		try{
			let nama = req.body.nama;
			let keterangan = req.body.keterangan;
			let opd_kode = req.body.opd_kode;
			
			let opd = await services.getOPDByKode(req, opd_kode);
			let data = {
				nama: nama,
				keterangan: keterangan,
			};
			if(opd.kode)data['opd'] = opd;

			result = await table.create(data);

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

			let opd = await services.getOPDByKode(req, opd_kode);
			let data = {
				nama: nama,
				keterangan: keterangan,
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