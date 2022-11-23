import db from "../../models";
import bcrypt from "bcrypt";
import {
	validationResult
} from "express-validator";

const table = db.penduduk;

export default class PendudukController {
	static async getData(req, res) {
		var condition = {};
		console.log(req.session);

		try{
			let data = await table.find(condition);
			return res.send(data);
		}catch(err){
			return res.status(500).send({
				message: err.message || "Some error occurred while retrieving tutorials.",
			});
		}
	}

	static async getOneData(req, res) {

		try{
			let id = req.params.id;
			let data = table.findById(id);
			if (!data) return res.status(400).send({
						message: "Not found Tutorial with id " + id,
					});
			else return res.send(data);
		}catch(err){
			return res.status(500).send({
				message: err.message || "Some error occurred while retrieving tutorials.",
			});
		}
	}

	static async store(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array(),
			});
		}

		let nik = req.body.nik;
		let nama = req.body.nama;
		let hubunganKeluarga = req.body.hubunganKeluarga;
		let jk = req.body.jk;
		let lahirTempat = req.body.lahirTempat;
		let lahirTgl = req.body.lahirTgl;
		let agama = req.body.agama;
		let alamat = req.body.alamat;
		let fisik = req.body.fisik;
		let fisikKet = req.body.fisikKet;
		let penyakit = req.body.penyakit;
		let keterampilan = req.body.keterampilan;
		let statKawin = req.body.statKawin;
		let statPendidikan = req.body.statPendidikan;
		let statPekerjaanUtama = req.body.statPekerjaanUtama;
		let statPekerjaanSamping = req.body.statPekerjaanSamping;

		await db.penduduk.insertOne({});

		// const users = new table({
		// 	nik: nik,
		// });

		// users
		// 	.save(users)
		// 	.then((data) => {
		// 		// console.log(data);
		// 		res.send(data);
		// 	})
		// 	.catch((err) => {
		// 		res.status(500).send({
		// 			message: err.message,
		// 			req: username,
		// 		});
		// 	});
	}

	static async update(req, res) {
		let username = req.body.username;
		let id = req.params.id;

		table
			.findByIdAndUpdate(
				id, {
					username,
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

}