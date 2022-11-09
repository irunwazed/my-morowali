import db from "../../models";
import bcrypt from "bcrypt";
import {
	validationResult
} from "express-validator";

const table = db.opd;

export default class OpdController {
	static async getData(req, res) {
		const opd_nama = req.query.opd_nama;
		var condition = opd_nama ?
			{
				opd_nama: {
					$regex: new RegExp(opd_nama),
					$options: "i",
				},
			} :
			{};

		table
			.find(condition)
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

		let opd_nama = req.body.opd_nama;

		// let user = await db.users.findById(login_id);

		const data = new table({
			opd_nama: opd_nama
		});

		try{
			let result = await data.save(data);
			res.send(result);
		}catch(err){
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	}

	static async update(req, res) {
		let opd_nama = req.body.opd_nama;
		let id = req.params.id;

		table
			.findByIdAndUpdate(
				id, {
					opd_nama,
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