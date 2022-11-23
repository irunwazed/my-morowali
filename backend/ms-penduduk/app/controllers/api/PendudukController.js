import db from "../../models";
import bcrypt from "bcrypt";
import {
	validationResult
} from "express-validator";
const { body } = require('express-validator/check')

const table = db.penduduk;

exports.validate = {
  store: [ 
		body('no_kk', 'no_kk tidak ada').exists(),
		body('nik', 'nik tidak ada').exists(),
		body('nama', 'nama tidak ada').exists(),
		body('hubunganKeluarga').exists().optional().isInt(),
		body('jk', 'jk tidak ada').optional().isIn(['L', 'P']),
		body('lahirTempat', 'lahirTempat tidak ada').exists(),
		body('lahirTgl', 'lahirTgl tidak ada').exists(),
		body('agama', 'agama tidak ada').exists(),
		body('alamat', 'alamat tidak ada').exists(),
		body('fisik', 'fisik tidak ada').exists(),
		body('fisikKet', 'fisikKet tidak ada').exists(),
		body('statKawin', 'statKawin tidak ada').exists(),
		body('statPendidikan', 'statPendidikan tidak ada').exists(),
		// body('status').optional().isIn(['enabled', 'disabled'])
	],
}

export default class PendudukController {

	static async getData(req, res) {
		var condition = {};
		// console.log(req.session);
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

		let no_kk = req.body.no_kk;
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
		let statKawin = req.body.statKawin;
		let statPendidikan = req.body.statPendidikan;
		
		let wilayah = req.body.wilayah;
		wilayah = wilayah.split("-");

		await db.penduduk.insertOne({
			nama: nama,
			nik: nik,
			jk: jk,
			lahir:{
				tempat: lahirTempat,
				tanggal: lahirTgl,
			},
			agama: agama,
			alamat: {
				provinsi_kode: wilayah[0],
				kabupaten_kode: wilayah[1],
				kecamatan_kode: wilayah[2],
				kelurahan_kode: wilayah[3],
				kabupaten_nama: 'Morowali',
				kecamatan_nama: '',
				kelurahan_nama: '',
				alamat_nama: alamat,
			},
			fisik: {
				fisik_id: fisik,
				keterangan: fisikKet,
			},
			status_pernikahan: statKawin,
			pendidikan_id: statPendidikan,
		});

		res.send({});

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