import db from "../../models";
import bcrypt from "bcrypt";
import {
	validationResult
} from "express-validator";
import { check } from 'express-validator';
import services from "../../libraries/api-services"

const table = db.penduduk;

exports.validate = {
  store: [ 
		check('no_kk', 'no_kk tidak ada').exists(),
		check('kepala_keluarga', 'kepala_keluarga tidak ada').exists().isIn([true, false]),
		check('hubungan_keluarga').exists().optional().isInt(),//1. Istri / Suami, 2 Anak, 3 Wali, 4 Lainnya
		check('nik', 'nik tidak ada').exists(),
		check('nama', 'nama tidak ada').exists(),
		check('jk', 'jk tidak ada').exists().isIn(['L', 'P']),
		check('lahirTempat', 'lahirTempat tidak ada').exists(),
		check('lahirTgl', 'lahirTgl tidak ada').exists(),
		check('agama', 'agama tidak ada').exists(),
		check('wilayah', 'wilayah tidak ada').exists(),
		check('alamat', 'alamat tidak ada').exists(),
		check('fisik', 'fisik tidak ada').exists(),
		check('fisikKet', 'fisikKet tidak ada').exists(),
		check('statKawin', 'statKawin tidak ada').exists(),
		check('statPendidikan', 'statPendidikan tidak ada').exists(),
		check('hidup', 'hidup tidak ada').exists().isIn([true, false]),
		
	],
}

export default class PendudukController {

	static async getData(req, res) {
		var condition = {};
		// console.log(req.session);
		try{
			let data = await table.find(condition);
			return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving tutorials.",
			});
		}
	}

	static async getOneData(req, res) {

		try{
			let id = req.params.id;
			let data = await table.findById(id);
			if (!data) return res.status(400).send({
						message: "Not found Tutorial with id " + id,
					});
			else return res.send({statusCode: 200, data: data});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving tutorials.",
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
			
			let no_kk = req.body.no_kk;
			let nik = req.body.nik;
			let nama = req.body.nama;
			let jk = req.body.jk;
			let lahirTempat = req.body.lahirTempat;
			let lahirTgl = req.body.lahirTgl;
			let agama = req.body.agama;
			let alamat = req.body.alamat;
			let fisik = req.body.fisik;
			let fisikKet = req.body.fisikKet;
			let statKawin = req.body.statKawin;
			let statPendidikan = req.body.statPendidikan;
			let longitude = req.body.longitude;
			let latitude = req.body.latitude;
			let wilayah = req.body.wilayah;
			let hidup = req.body.hidup;
			let kb = req.body.kb;
			let kepala_keluarga = req.body.kepala_keluarga;
			let hubungan_keluarga = req.body.hubungan_keluarga;
			
			
			let provinsi = await db.wil_provinsi.find({kode: wilayah.slice(0, 2)});
			let kabupaten = await db.wil_kabupaten.find({kode: wilayah.slice(0, 4)});
			let kecamatan = await db.wil_kecamatan.find({kode: wilayah.slice(0, 7)});
			let desa = await db.wil_desa.find({kode: wilayah.slice(0, 10)});

			// insert data keluarga
			let cekNoKK = await db.keluarga.find({ no_kk: no_kk });
			let kk_id = '';
			if(cekNoKK.length > 0){
				kk_id = cekNoKK[0]._id;
			}else{
				kepala_keluarga = true;
				let dataKK = await db.keluarga.create({
					no_kk: no_kk,
					kb: kb,
					nik_kepala: nik
				});
				kk_id = dataKK._id;
			}

			// insert penduduk
			let dataPenduduk = {
				nama: nama,
				jk: jk,
				lahir:{
					tempat: lahirTempat,
					tanggal: lahirTgl,
				},
				agama: agama,
				alamat: {
					provinsi_kode: wilayah.slice(0, 2),
					kabupaten_kode: wilayah.slice(0, 4),
					kecamatan_kode: wilayah.slice(0, 7),
					kelurahan_kode: wilayah.slice(0, 10),
					provinsi_nama: provinsi[0].nama,
					kabupaten_nama: kabupaten[0].nama,
					kecamatan_nama: kecamatan[0].nama,
					kelurahan_nama: desa[0].nama,
					alamat_nama: alamat,
					longitude: longitude,
					latitude: latitude,
				},
				fisik: {
					fisik_id: fisik,
					keterangan: fisikKet,
				},
				status_pernikahan: statKawin,
				pendidikan_id: statPendidikan,
				hidup: hidup,
			};
			let penduduk_id = '';
			let cekNIK = await db.penduduk.find({ nik: nik });
			if(cekNIK.length > 0){
				penduduk_id = cekNIK[0]._id;
				await db.penduduk.findByIdAndUpdate(penduduk_id, dataPenduduk, {useFindAndModify: false,});
			}else{
				dataPenduduk['nik'] = nik;
				let tempPenduduk = await db.penduduk.create(dataPenduduk);
				penduduk_id = tempPenduduk._id;
			}

		
			// insert data hubkel
			let cekHub = await db.keluarga_penduduk.find({ keluarga_id: kk_id, penduduk_id: penduduk_id });
			if(cekHub.length > 0){
				await db.keluarga_penduduk.findByIdAndUpdate(cekHub[0]._id, {kepala: kepala_keluarga, level: hubungan_keluarga}, {useFindAndModify: false,});
			}else{
				await db.keluarga_penduduk.create({
					keluarga_id: kk_id,
					penduduk_id: penduduk_id,
					kepala: kepala_keluarga,
					level: hubungan_keluarga,
				});
			}

		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving tutorials.",
			});
		}
		return res.send({
			statusCode: 200,
			message: 'Data was inserted successfully.',
		});
	}

	static async delete(req, res) {
		var id = (req.params.id);
		try{
			let data = await db.penduduk.aggregate([
				{ $match: { _id: db.mongoose.Types.ObjectId(id) } },
				{
					$lookup:{
						from: 'keluarga_penduduks',
						localField: '_id',
						foreignField: 'penduduk_id',
						as: 'keluarga_penduduk'
					},
				},
			]);
			
			if (!data) {
				return res.status(400).send({
					statusCode: 400,
					message: `Cannot delete data with id=${id}. Maybe data was not found!`,
				});
			} else {
				
				await db.penduduk.findByIdAndRemove(id);
				await data[0].keluarga_penduduk.forEach( async element =>  {
					await db.keluarga_penduduk.findByIdAndRemove(element._id);
				});

				return res.send({
					statusCode: 200,
					message: "data was deleted successfully!"
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