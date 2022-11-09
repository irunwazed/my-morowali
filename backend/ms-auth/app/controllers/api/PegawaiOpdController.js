import db from "../../models";
import bcrypt from "bcrypt";
import {
	validationResult
} from "express-validator";

const table = db.pegawai_opd;

export default class PegawaiOpdController {
	static async getData(req, res) {
		const nama = req.query.nama;
		var condition = nama ?
			{
				// nama: {
				// 	$regex: new RegExp(nama),
				// 	$options: "i",
				// },
			} :
			{};

		table
			.aggregate([
				// { $match : { _id: 63351e26990668b7724ef505} },
				// { $unwind:"$pegawai" },
				{ $lookup:
					{
						from: 'opds',
						localField: 'opd_id',
						foreignField: '_id',
						as: 'opd'
					},
				},
				{ $lookup:
					{
						from: 'pegawais',
						localField: 'pegawai.pegawai_id',
						foreignField: '_id',
						as: 'pegawais'
					},
				},
				{ $lookup:
					{
						from: 'logins',
						localField: 'pegawais.login_id',
						foreignField: '_id',
						as: 'login'
					},
				},
				// {
				// 	$project: {
				// 		nama_opd: "$opd.opd_nama",
				// 	}
				// },
				// {  $match : { $or : [
				// 	{ 'opd.opd_nama': 'Rumah Sakit Umum Daerah Morowali' },
				// 	{ 'opd.kode': '1.1' },
				// ] } }
			])
			// .where({})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || "Some error occurred while retrieving tutorials.",
				});
			});
	}

	static async getOneData(req, res) {
		let id = req.params.id;

		table
			.findById(id)
			.then((data) => {
				if (!data)
					res.status(400).send({
						message: "Not found Tutorial with id " + id,
					});
				else res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || "Some error occurred while retrieving tutorials.",
				});
			});
	}

	static async store(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array(),
			});
		}

		let nama = req.body.nama;
		let login_id = req.body.login_id;

		// let user = await db.users.findById(login_id);

		const pegawai = new db.pegawai();
		pegawai.nama = nama;
		pegawai.login_id = login_id;

		try{
			let result = await pegawai.save(pegawai);
			res.send(result);
		}catch(err){
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	}

	static async update(req, res) {
		let nama = req.body.nama;
		let id = req.params.id;

		table
			.findByIdAndUpdate(
				id, {
					nama,
				}, {
					useFindAndModify: false,
				}
			)
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: `Cannot update Users with id=${id}. Maybe Users was not found!`,
					});
				} else
					res.send({
						message: "Users was updated successfully.",
					});
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error updating Users with id=" + id,
				});
			});
	}

	static async delete(req, res) {
		let id = req.params.id;

		table
			.findByIdAndRemove(id)
			.then((data) => {
				if (!data) {
					res.status(400).send({
						message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
					});
				} else {
					res.send({
						message: "Users was deleted successfully!",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Could not delete Users with id=" + id,
				});
			});
	}

	static async deleteAll(req, res) {
		table
			.deleteMany({})
			.then((data) => {
				res.send({
					message: `${data.deletedCount} Users were deleted successfully!`,
				});
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || "Some error occurred while removing all Users.",
				});
			});
	}

}