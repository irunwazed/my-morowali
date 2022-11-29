import db from "../../models";
import { validationResult, check } from "express-validator";

const table = db.keluarga_kesejahteraan;

exports.validate = {
  store: [ 
		check('keluarga_id', 'keluarga_id tidak ada').exists(),
		check('status_kesejahteraan', 'status_kesejahteraan tidak ada').exists().isInt({ min: 1, max: 5 }), // 1. Sejahtera, 2 Hampir Miskin, 3. Miskin, 4. Sangat Miskin, 5. Belum Ada
		check('tahun', 'tahun tidak ada').exists().isInt(),
		check('pendapatan_utama', 'pendapatan_utama tidak ada').exists().isFloat(),
		check('pendapatan_sampingan', 'pendapatan_sampingan tidak ada').exists().isFloat(),
		check('pengeluaran_total', 'pengeluaran_total tidak ada').exists().isFloat(),
		check('indikator_rumah_id', 'indikator_rumah_id tidak ada').exists(),
		check('indikator_rumah_ukuran', 'indikator_rumah_ukuran tidak ada').exists().isFloat(),
		check('indikator_rumah_ket', 'indikator_rumah_ket tidak ada').exists(),
		check('indikator_atap_id', 'indikator_atap_id tidak ada').exists(),
		check('indikator_atap_ket', 'indikator_atap_ket tidak ada').exists(),
		check('indikator_bahan_bakar_id', 'indikator_bahan_bakar_id tidak ada').exists(),
		check('indikator_bahan_bakar_ket', 'indikator_bahan_bakar_ket tidak ada').exists(),
		check('indikator_dinding_id', 'indikator_dinding_id tidak ada').exists(),
		check('indikator_dinding_ket', 'indikator_dinding_ket tidak ada').exists(),
		check('indikator_jamban_id', 'indikator_jamban_id tidak ada').exists(),
		check('indikator_jamban_ket', 'indikator_jamban_ket tidak ada').exists(),
		check('indikator_lantai_id', 'indikator_lantai_id tidak ada').exists(),
		check('indikator_lantai_ket', 'indikator_lantai_ket tidak ada').exists(),
		check('indikator_penerangan_id', 'indikator_penerangan_id tidak ada').exists(),
		check('indikator_penerangan_ket', 'indikator_penerangan_ket tidak ada').exists(),
		check('indikator_sumber_air_id', 'indikator_sumber_air_id tidak ada').exists(),
		check('indikator_sumber_air_ket', 'indikator_sumber_air_ket tidak ada').exists(),
	],
}

export default class KesejahteraanController {

	static async getData(req, res) {
		var condition = {};
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
			
			let keluarga_id = req.body.keluarga_id;
			let status_kesejahteraan = req.body.status_kesejahteraan;
			let tahun = req.body.tahun;
			let pendapatan_utama = req.body.pendapatan_utama;
			let pendapatan_sampingan = req.body.pendapatan_sampingan;
			let pengeluaran_total = req.body.pengeluaran_total;
			let indikator_rumah_id = req.body.indikator_rumah_id;
			let indikator_rumah_ukuran = req.body.indikator_rumah_ukuran;
			let indikator_rumah_ket = req.body.indikator_rumah_ket;
			let indikator_atap_id = req.body.indikator_atap_id;
			let indikator_atap_ket = req.body.indikator_atap_ket;
			let indikator_bahan_bakar_id = req.body.indikator_bahan_bakar_id;
			let indikator_bahan_bakar_ket = req.body.indikator_bahan_bakar_ket;
			let indikator_dinding_id = req.body.indikator_dinding_id;
			let indikator_dinding_ket = req.body.indikator_dinding_ket;
			let indikator_jamban_id = req.body.indikator_jamban_id;
			let indikator_jamban_ket = req.body.indikator_jamban_ket;
			let indikator_lantai_id = req.body.indikator_lantai_id;
			let indikator_lantai_ket = req.body.indikator_lantai_ket;
			let indikator_penerangan_id = req.body.indikator_penerangan_id;
			let indikator_penerangan_ket = req.body.indikator_penerangan_ket;
			let indikator_sumber_air_id = req.body.indikator_sumber_air_id;
			let indikator_sumber_air_ket = req.body.indikator_sumber_air_ket;
			
			let dataInput = {
				keluarga_id: keluarga_id,
				status_kesejahteraan: status_kesejahteraan,
				tahun: tahun,
				keuangan: {
					pendapatan_utama: pendapatan_utama,
					pendapatan_sampingan: pendapatan_sampingan,
					pengeluaran_total: pengeluaran_total,
				},
				indikator: {
					rumah: {
						rumah_id: indikator_rumah_id,
						ukuran: indikator_rumah_ukuran,
						keterangan: indikator_rumah_ket,
					},
					atap: {
						atap_id: indikator_atap_id,
						keterangan: indikator_atap_ket,
					},
					bahan_bakar: {
						bahan_bakar_id: indikator_bahan_bakar_id,
						keterangan: indikator_bahan_bakar_ket,
					},
					dinding: {
						dinding_id: indikator_dinding_id,
						keterangan: indikator_dinding_ket,
					},
					jamban: {
						jamban_id: indikator_jamban_id,
						keterangan: indikator_jamban_ket,
					},
					lantai: {
						lantai_id: indikator_lantai_id,
						keterangan: indikator_lantai_ket,
					},
					penerangan: {
						penerangan_id: indikator_penerangan_id,
						keterangan: indikator_penerangan_ket,
					},
					sumber_air: {
						sumber_air_id: indikator_sumber_air_id,
						keterangan: indikator_sumber_air_ket,
					},
				},
			};

			
			if(req.params.id){
				let id = req.params.id;
				let data = table.findByIdAndUpdate(id, dataInput, {useFindAndModify: false,});
				if (!data) {
					return res.status(404).send({
						statusCode: 404,
						message: `Cannot update data with id=${id}. Maybe data was not found!`,
					});
				}
				return res.send({
					statusCode: 200,
					message: "Data was updated successfully."
				});
			}else{
				let cekData = await table.find({ keluarga_id: keluarga_id, tahun: tahun });
				if(cekData.length > 0){
					return res.status(400).send({
						statusCode: 400,
						message: 'Data already exists.',
					});
				}

				let data = table.create(dataInput);
				return res.send({
					statusCode: 200,
					message: 'Data was inserted successfully.',
				});
			}

		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving tutorials.",
			});
		}
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