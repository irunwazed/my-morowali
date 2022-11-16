import db from "../../models";
import {
	validationResult
} from "express-validator";

const table = db.pegawai;
const tableLogin = db.pegawai;

export default class PegawaiController {

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
				{
					$lookup:
						{
							from: 'logins',
							localField: 'login_id',
							foreignField: '_id',
							as: 'login'
						}
				},
				{ "$match": { "login.username": "123456", "nip": "123456" } },
			])
			// .find({})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || "Some error occurred while retrieving tutorials.",
				});
			});
	}

	static async store(req, res){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array(),
			});
		}

		let nip = req.body.nip;
		let nama = req.body.nama;
		let posisi = req.body.posisi;
		let nik = req.body.nik ? req.body.nik : "";

		let pegawai = await table
		.aggregate([
			{
				$lookup:
					{
						from: 'logins',
						localField: 'login_id',
						foreignField: '_id',
						as: 'login'
					}
			},
			{ "$match": { "login.username": nip, "nip": nip } },
		]);
		console.log(pegawai.length);
		res.send(pegawai);
		if(pegawai.length == 0){
			
		}

	}

	// static async getOneData(req, res) {
	// 	let id = req.params.id;

	// 	table
	// 		.findById(id)
	// 		.then((data) => {
	// 			if (!data)
	// 				res.status(400).send({
	// 					message: "Not found Tutorial with id " + id,
	// 				});
	// 			else res.send(data);
	// 		})
	// 		.catch((err) => {
	// 			res.status(500).send({
	// 				message: err.message || "Some error occurred while retrieving tutorials.",
	// 			});
	// 		});
	// }

	// static async store(req, res) {
	// 	const errors = validationResult(req);
	// 	if (!errors.isEmpty()) {
	// 		return res.status(422).json({
	// 			errors: errors.array(),
	// 		});
	// 	}

	// 	let nama = req.body.nama;
	// 	let login_id = req.body.login_id;

	// 	// let user = await db.users.findById(login_id);

	// 	const pegawai = new db.pegawai();
	// 	pegawai.nama = nama;
	// 	pegawai.login_id = login_id;

	// 	try{
	// 		let result = await pegawai.save(pegawai);
	// 		res.send(result);
	// 	}catch(err){
	// 		console.log(err.message);
	// 		res.status(500).send({
	// 			message: err.message,
	// 		});
	// 	}
	// }

	// static async update(req, res) {
	// 	let nama = req.body.nama;
	// 	let id = req.params.id;

	// 	table
	// 		.findByIdAndUpdate(
	// 			id, {
	// 				nama,
	// 			}, {
	// 				useFindAndModify: false,
	// 			}
	// 		)
	// 		.then((data) => {
	// 			if (!data) {
	// 				res.status(404).send({
	// 					message: `Cannot update Users with id=${id}. Maybe Users was not found!`,
	// 				});
	// 			} else
	// 				res.send({
	// 					message: "Users was updated successfully.",
	// 				});
	// 		})
	// 		.catch((err) => {
	// 			res.status(500).send({
	// 				message: "Error updating Users with id=" + id,
	// 			});
	// 		});
	// }

	// static async delete(req, res) {
	// 	let id = req.params.id;

	// 	table
	// 		.findByIdAndRemove(id)
	// 		.then((data) => {
	// 			if (!data) {
	// 				res.status(400).send({
	// 					message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
	// 				});
	// 			} else {
	// 				res.send({
	// 					message: "Users was deleted successfully!",
	// 				});
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			res.status(500).send({
	// 				message: "Could not delete Users with id=" + id,
	// 			});
	// 		});
	// }

}