import db from "../../models";
import bcrypt from "bcrypt";
import {
	validationResult
} from "express-validator";

const table = db.penduduk;

export default class PendudukController {
	static async getData(req, res) {
		var condition = {};

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

		let username = req.body.username;
		let password = req.body.password;
		let name = req.body.name ? req.body.name : "";
		let nik = req.body.nik ? req.body.nik : "";

		const users = new table({
			username: username,
			password: bcrypt.hashSync(password, 10),
			profil: {
				name: name,
				nik: nik,
			},
		});

		users
			.save(users)
			.then((data) => {
				// console.log(data);
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message,
					req: username,
				});
			});
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

	static async changePassword(req, res){
		let session = req.setSession;
		let password = req.body.password;
		let passwordReset = req.body.passwordReset;
		let passwordResetValid = req.body.passwordResetValid;

		if(password == passwordResetValid) return res.status(412).send({
			message: "Password same with new password!",
		}); 

		if(passwordReset != passwordResetValid) return res.status(412).send({
			message: "Password reset not same!",
		}); 

		let user = await table.findById(session.id);
		let userAll = await table.find({});

		if(!user.id) return res.status(401).send({
			message: "User not found. please login again!",
		});

		if (!bcrypt.compareSync(password, user.password)) return res.status(401).send({
			message: "wrong password!",
		});

		try{
			let status = await table.findByIdAndUpdate(session.id, {
				password: bcrypt.hashSync(passwordReset, 10),
			}, {
				useFindAndModify: false,
			});

			if(!status) return res.status(401).send({
				message: "Change user fail!",
			});
			return res.status(200).send({
				message: "Change user success!",
			});
		}catch(err){
			return res.status(500).send({
				message: "User cancel change password!",
			});
		}
		
		
	}
}