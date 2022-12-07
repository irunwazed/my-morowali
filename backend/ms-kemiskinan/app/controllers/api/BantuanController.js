const db = require("../../models");
const { validationResult, check } = require("express-validator");
const paginate = require("../../libraries/paginate");

const table = db.penduduk_bantuan;

exports.validate = {
  store: [ 
		check('tahun', 'tahun tidak ada').exists().isInt(), // cant update 
		check('bantuan_id', 'bantuan_id tidak ada').exists(),
		check('penduduk').exists(),
		check('pagu', 'pagu tidak ada').isFloat(),
		check('keterangan', 'keterangan tidak ada').exists(),
		check('wilayah', 'wilayah tidak ada').exists(),
		check('alamat', 'alamat tidak ada').exists(),
	],
}

exports.controller = class BantuanController {

	static async getData(req, res) {
		var condition = {};
		try{
			let data = await paginate.find(req, 'penduduk_bantuan', condition);
			return res.send(data);
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
			let penduduk = req.body.penduduk;
			let tahun = req.body.tahun;
			let bantuan_id = req.body.bantuan_id;
			let pagu = req.body.pagu;
			let keterangan = req.body.keterangan;
			let wilayah = req.body.wilayah;
			let alamat = req.body.alamat;
			let longitude = req.body.longitude;
			let latitude = req.body.latitude;

			console.log();
			let dataPenduduk = [];
			if(Array.isArray(penduduk)){

				dataPenduduk = await Promise.all(penduduk.map( async e => {
					let data = await db.penduduk.findById(e);
					return { penduduk_id: data._id, nik: data.nik, nama: data.nama };
				}));
			}else{
				let data = await db.penduduk.findById(penduduk);
				dataPenduduk.push({ penduduk_id: data._id, nik: data.nik, nama: data.nama });
			}

			let lokasi = {}
			let level = 4;
			if(wilayah.length >= 2){
				lokasi['provinsi_kode'] = wilayah.slice(0, 2);
				let tmp = await db.wil_provinsi.find({kode: wilayah.slice(0, 2)})
				lokasi['provinsi_nama'] = tmp[0].nama;
				level = 1;
			}
			if(wilayah.length >= 4){
				lokasi['kabupaten_kode'] = wilayah.slice(0, 4);
				let tmp = await db.wil_kabupaten.find({kode: wilayah.slice(0, 4)})
				lokasi['kabupaten_nama'] = tmp[0].nama;
				level = 2;
			}
			if(wilayah.length >= 7){
				lokasi['kecamatan_kode'] = wilayah.slice(0, 7);
				let tmp = await db.wil_kecamatan.find({kode: wilayah.slice(0, 7)})
				lokasi['kecamatan_nama'] = tmp[0].nama;
				level = 3;
			}
			if(wilayah.length == 10){
				lokasi['kelurahan_kode'] = wilayah.slice(0, 10);
				let tmp = await db.wil_desa.find({kode: wilayah.slice(0, 10)})
				lokasi['kelurahan_nama'] = tmp[0].nama;
				level = 4;
			}
			lokasi['level'] = level;
			lokasi['alamat_nama'] = alamat;
			longitude?lokasi['longitude'] = longitude:'';
			latitude?lokasi['latitude'] = latitude:'';
			
			let dataInput = {
				penduduk: dataPenduduk,
				bantuan: {
					bantuan_id: bantuan_id,
					nama: await BantuanController.getIndikatorName('bantuan', bantuan_id),
					pagu: pagu,
					keterangan: keterangan,
				},
				lokasi: lokasi,
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