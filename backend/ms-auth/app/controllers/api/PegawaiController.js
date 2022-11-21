import db from "../../models";
import {
	validationResult
} from "express-validator";
import bcrypt from 'bcrypt';

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
		let name = req.body.name;
		let opd_nama = req.body.opd_nama;
		let opd_kode = req.body.opd_kode;
		let jabatan_nama = req.body.jabatan_nama;
		let jabatan_level = req.body.jabatan_level;
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
		if(pegawai.length == 0){
			await db.login.insertMany([
				{name: name, username: nip, level: 4, password: bcrypt.hashSync('123456', 10), status: 1},
			]);
			let dataLogin = await db.login.find({username: nip});
			await table.insertMany([
				{nama: name, nip: nip, nik: nik, login_id: dataLogin[0]._id, posisi: [
					{
						opd_nama: opd_nama,
						opd_kode: opd_kode,
						jabatan_nama: jabatan_nama,
						jabatan_level: jabatan_level,
					}
				]},
			]);
		}else{
			let dataLogin = await db.login.find({username: nip});


			await db.login.findOneAndUpdate({username: nip}, {name: name}, {
					useFindAndModify: false,
				}
			)


			await table.findOneAndUpdate({nip: nip}, {
				nama: name, 
				nik: nik, 
				posisi: [
					{
						opd_nama: opd_nama,
						opd_kode: opd_kode,
						jabatan_nama: jabatan_nama,
						jabatan_level: jabatan_level,
					}
				]}, {
					useFindAndModify: false,
				}
			)
		}
		res.send(pegawai);
	}

	static async delete(req, res){
		let nip = req.body.nip;

		await db.pegawai.deleteMany({nip: nip})
		await db.login.deleteMany({username: nip})
	}

}