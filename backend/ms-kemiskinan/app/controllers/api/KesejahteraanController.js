const db = require("../../models");
const { validationResult, check } = require("express-validator");
const paginate = require("../../libraries/paginate");
const upload = require("../../libraries/upload");

const table = db.keluarga_kesejahteraan;

exports.validate = {
  store: [ 
		check('keluarga_id', 'keluarga_id tidak ada').exists(), // cant update 
		check('tahun', 'tahun tidak ada').exists().isInt(), // cant update 
		check('status_kesejahteraan', 'status_kesejahteraan tidak ada').exists().isInt({ min: 1, max: 5 }), // 1. Sejahtera, 2 Hampir Miskin, 3. Miskin, 4. Sangat Miskin, 5. Belum Ada
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

exports.controller = class KesejahteraanController {

	static async getData(req, res) {
		var condition = [
			{
				$lookup:{
					from: 'keluargas',
					localField: 'keluarga_id',
					foreignField: '_id',
					pipeline: [
						{
							$lookup:{
								from: 'penduduks',
								localField: 'nik_kepala',
								foreignField: 'nik',
								as: 'penduduk'
							},
						}, 
						{
							$project: {
								keluarga_id: '$_id',
								no_kk: '$no_kk',
								penduduk_id: { $arrayElemAt: ['$penduduk._id', 0] },
								nama: { $arrayElemAt: ['$penduduk.nama', 0] },
								nik: { $arrayElemAt: ['$penduduk.nik', 0] },
							}
						}
					],
					as: 'kepala_keluarga'
				},
			}, 
			{ $unwind: "$kepala_keluarga" },
		];
		try{

			if(req.params.id){
				condition.push({ $match: { _id: db.mongoose.Types.ObjectId(req.params.id) } });
				let data = await table.aggregate(condition);
				if(!data[0]) return res.send({statusCode: 200, message: 'data not found!'});
				return res.send({statusCode: 200, data: data[0]});
			}

			let data = await paginate.aggregate(req, 'keluarga_kesejahteraan', condition);
			return res.send(data);
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
			
			req.files = req.files?req.files:{};
			
			let keluarga_id = req.body.keluarga_id;
			let status_kesejahteraan = req.body.status_kesejahteraan;
			let tahun = req.body.tahun;
			let pendapatan_utama = req.body.pendapatan_utama;
			let pendapatan_sampingan = req.body.pendapatan_sampingan;
			let pengeluaran_total = req.body.pengeluaran_total;
			let indikator_rumah_id = req.body.indikator_rumah_id;
			let indikator_rumah_ukuran = req.body.indikator_rumah_ukuran;
			let indikator_rumah_image = req.files.indikator_rumah_image;
			let indikator_rumah_ket = req.body.indikator_rumah_ket;
			let indikator_atap_id = req.body.indikator_atap_id;
			let indikator_atap_image = req.files.indikator_atap_image;
			let indikator_atap_ket = req.body.indikator_atap_ket;
			let indikator_bahan_bakar_id = req.body.indikator_bahan_bakar_id;
			let indikator_bahan_bakar_image = req.files.indikator_bahan_bakar_image;
			let indikator_bahan_bakar_ket = req.body.indikator_bahan_bakar_ket;
			let indikator_dinding_id = req.body.indikator_dinding_id;
			let indikator_dinding_image = req.files.indikator_dinding_image;
			let indikator_dinding_ket = req.body.indikator_dinding_ket;
			let indikator_jamban_id = req.body.indikator_jamban_id;
			let indikator_jamban_image = req.files.indikator_jamban_image;
			let indikator_jamban_ket = req.body.indikator_jamban_ket;
			let indikator_lantai_id = req.body.indikator_lantai_id;
			let indikator_lantai_image = req.files.indikator_lantai_image;
			let indikator_lantai_ket = req.body.indikator_lantai_ket;
			let indikator_penerangan_id = req.body.indikator_penerangan_id;
			let indikator_penerangan_image = req.files.indikator_penerangan_image;
			let indikator_penerangan_ket = req.body.indikator_penerangan_ket;
			let indikator_sumber_air_id = req.body.indikator_sumber_air_id;
			let indikator_sumber_air_image = req.files.indikator_sumber_air_image;
			let indikator_sumber_air_ket = req.body.indikator_sumber_air_ket;

			let datetime = new Date().getTime();
			indikator_rumah_image = await upload.upload(indikator_rumah_image, keluarga_id+'_'+tahun+'_rumah_'+datetime+'.gif', '/kesejahteraan/rumah/')
			indikator_atap_image = await upload.upload(indikator_atap_image, keluarga_id+'_'+tahun+'_atap_'+datetime+'.gif', '/kesejahteraan/atap/')
			indikator_bahan_bakar_image = await upload.upload(indikator_bahan_bakar_image, keluarga_id+'_'+tahun+'_bahan_bakar_'+datetime+'.gif', '/kesejahteraan/bahan_bakar/')
			indikator_dinding_image = await upload.upload(indikator_dinding_image, keluarga_id+'_'+tahun+'_dinding_'+datetime+'.gif', '/kesejahteraan/dinding/')
			indikator_jamban_image = await upload.upload(indikator_jamban_image, keluarga_id+'_'+tahun+'_jamban_'+datetime+'.gif', '/kesejahteraan/jamban/')
			indikator_lantai_image = await upload.upload(indikator_lantai_image, keluarga_id+'_'+tahun+'_lantai_'+datetime+'.gif', '/kesejahteraan/lantai/')
			indikator_penerangan_image = await upload.upload(indikator_penerangan_image, keluarga_id+'_'+tahun+'_penerangan_'+datetime+'.gif', '/kesejahteraan/penerangan/')
			indikator_sumber_air_image = await upload.upload(indikator_sumber_air_image, keluarga_id+'_'+tahun+'_sumber_air_'+datetime+'.gif', '/kesejahteraan/sumber_air/')
			
			
			let dataInput = {
				status_kesejahteraan: status_kesejahteraan,
				keuangan: {
					pendapatan_utama: pendapatan_utama,
					pendapatan_sampingan: pendapatan_sampingan,
					pengeluaran_total: pengeluaran_total,
				},
				indikator: {
					rumah: {
						rumah_id: indikator_rumah_id,
						nama: await KesejahteraanController.getIndikatorName('ki_rumah', indikator_rumah_id),
						image: indikator_rumah_image.file,
						ukuran: indikator_rumah_ukuran,
						keterangan: indikator_rumah_ket,
					},
					atap: {
						atap_id: indikator_atap_id,
						nama: await KesejahteraanController.getIndikatorName('ki_atap', indikator_atap_id),
						image: indikator_atap_image.file,
						keterangan: indikator_atap_ket,
					},
					bahan_bakar: {
						bahan_bakar_id: indikator_bahan_bakar_id,
						nama: await KesejahteraanController.getIndikatorName('ki_bahan_bakar', indikator_bahan_bakar_id),
						image: indikator_bahan_bakar_image.file,
						keterangan: indikator_bahan_bakar_ket,
					},
					dinding: {
						dinding_id: indikator_dinding_id,
						nama: await KesejahteraanController.getIndikatorName('ki_dinding', indikator_dinding_id),
						image: indikator_dinding_image.file,
						keterangan: indikator_dinding_ket,
					},
					jamban: {
						jamban_id: indikator_jamban_id,
						nama: await KesejahteraanController.getIndikatorName('ki_jamban', indikator_jamban_id),
						image: indikator_jamban_image.file,
						keterangan: indikator_jamban_ket,
					},
					lantai: {
						lantai_id: indikator_lantai_id,
						nama: await KesejahteraanController.getIndikatorName('ki_lantai', indikator_lantai_id),
						image: indikator_lantai_image.file,
						keterangan: indikator_lantai_ket,
					},
					penerangan: {
						penerangan_id: indikator_penerangan_id,
						nama: await KesejahteraanController.getIndikatorName('ki_penerangan', indikator_penerangan_id),
						image: indikator_penerangan_image.file,
						keterangan: indikator_penerangan_ket,
					},
					sumber_air: {
						sumber_air_id: indikator_sumber_air_id,
						nama: await KesejahteraanController.getIndikatorName('ki_sumber_air', indikator_sumber_air_id),
						image: indikator_sumber_air_image.file,
						keterangan: indikator_sumber_air_ket,
					},
				},
			};

			if(req.params.id){

				let id = req.params.id;
				let tmp = await table.findById(id);

				if(!indikator_rumah_image.status){
					dataInput.indikator.rumah.image = tmp.indikator.rumah.image;
				};
				if(!indikator_atap_image.status){
					dataInput.indikator.atap.image = tmp.indikator.atap.image;
				};
				if(!indikator_bahan_bakar_image.status){
					dataInput.indikator.bahan_bakar.image = tmp.indikator.bahan_bakar.image;
				};
				if(!indikator_dinding_image.status){
					dataInput.indikator.dinding.image = tmp.indikator.dinding.image;
				};
				if(!indikator_jamban_image.status){
					dataInput.indikator.jamban.image = tmp.indikator.jamban.image;
				};
				if(!indikator_lantai_image.status){
					dataInput.indikator.lantai.image = tmp.indikator.lantai.image;
				};
				if(!indikator_penerangan_image.status){
					dataInput.indikator.penerangan.image = tmp.indikator.penerangan.image;
				};
				if(!indikator_sumber_air_image.status){
					dataInput.indikator.sumber_air.image = tmp.indikator.sumber_air.image;
				};

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

				let cekData = await table.find({ keluarga_id: keluarga_id, tahun: tahun });
				if(cekData.length > 0){
					return res.status(400).send({
						statusCode: 400,
						message: 'Data already exists.',
					});
				}
				
				dataInput['keluarga_id'] = keluarga_id;
				dataInput['tahun'] = tahun;

				await table.create(dataInput);
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