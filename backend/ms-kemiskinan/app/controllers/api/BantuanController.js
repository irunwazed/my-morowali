import db from "../../models";
import { validationResult, check } from "express-validator";

const table = db.penduduk_bantuan;

exports.validate = {
  store: [ 
		check('tahun', 'tahun tidak ada').exists().isInt(), // cant update 
		check('bantuan_id', 'bantuan_id tidak ada').exists(),
		check('penduduk', 'penduduk tidak ada').exists().isArray({ min: 1 }),
		check('pagu', 'pagu tidak ada').isFloat(),
		check('keterangan', 'keterangan tidak ada').exists(),
	],
}

export default class BantuanController {

	static async getData(req, res) {
		var condition = {};
		try{
			
			let data = await table.find(condition);
			// let tgl = data[0].createdAt;
			// console.log(tgl.getDate());
			// console.log(tgl.getMonth());
			// console.log(tgl.getFullYear());

			
			// let data = await table.aggregate([
			// 	{ $project: { data: {
			// 		year: { $substr: [ "$createdAt", 0, 4 ] },
			// 		month: { $substr: [ "$createdAt", 5, 2 ] },
			// 		day: { $substr: [ "$createdAt", 8, 2 ] },
			// 	} } }
			// ]);
			
			return res.send({statusCode: 200, data: data});
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
			let tahun = req.body.tahun;
			let bantuan_id = req.body.bantuan_id;
			let pagu = req.body.pagu;
			let keterangan = req.body.keterangan;
			
			let dataInput = {
				bantuan: {
					bantuan_id: bantuan_id,
					nama: await BantuanController.getIndikatorName('bantuan', bantuan_id),
					pagu: pagu,
					keterangan: keterangan,
				},
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
				dataInput['tahun'] = tahun;

				let data = await table.create(dataInput);
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
	
	static async getIndikatorName(table, id){
		let data = await db[table].findById(id);
		if(!data) return '';
		return data.nama;
	}
}