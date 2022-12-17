const db = require("../../models");
const { validationResult, check } = require("express-validator");
const paginate = require("../../libraries/paginate");
const upload = require("../../libraries/upload");

const table = db.penduduk;

exports.validate = {
  store: [ 
		check('no_kk').exists().isInt(),
		check('hubungan_keluarga').exists().isInt({ min: 1, max: 4 }), //1. Kepala , 2 Istri / Suami, 3 Anak, 4 Lainnya
		check('nik').exists().isInt(),
		check('nama', 'nama tidak ada').exists(),
		check('jk', 'jk tidak ada').exists().isIn(['L', 'P']),
		check('lahirTempat', 'lahirTempat tidak ada').exists(),
		check('lahirTgl', 'lahirTgl tidak ada').exists().toDate(),
		check('agama', 'agama tidak ada').exists().isInt({ min: 1, max: 6 }), // 1. Islam, 2. Kristen, 3. Khatolik, 4. Hindu, 5 Buddha, 6. Konghucu
		check('wilayah', 'wilayah tidak ada').exists(), // kode desa
		check('alamat', 'alamat tidak ada').exists(),
		check('fisik', 'fisik tidak ada').exists().isInt({ min: 1, max: 3 }), // 1. Lainnya, 2. Sehat, 3. Cacat
		check('fisikKet', 'fisikKet tidak ada').exists(),
		check('statKawin', 'statKawin tidak ada').exists().isInt({ min: 1, max: 5 }), // 1. Belum Menikah, 2. Menikah, 3 Cerai, 4. Duda, 5. Janda
		check('statPendidikan', 'statPendidikan tidak ada').exists().isInt({ min: 1, max: 7 }), // 1. Tidak punya ijazah, 2. SD, 3. SMP, 4. SMA, 5. S1, 6. S2, 7. S3
		check('hidup', 'hidup tidak ada').exists().isIn([true, false]),
		check('penyakit_id', 'penyakit_id tidak ada').exists(), // id table penyakit
		check('penyakit_ket', 'penyakit_ket tidak ada').exists(),
	],
}

exports.controller = class PendudukController {

	static async getData(req, res) {
		let search = req.query.search?req.query.search:{ value: '', regex: false };
		
		var condition = { 
			$or: [
				{ 'nama': { $regex: new RegExp(search.value), $options: "i" } },
				{ 'nik': { $regex: new RegExp(search.value), $options: "i" } },
				{ 'lahir.tempat': { $regex: new RegExp(search.value), $options: "i" } },
			]
		};
		try{
			let result = await paginate.find(req, 'penduduk', condition);
			return res.send(result);
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving tutorials.",
			});
		}
	}

	static async getOneData(req, res) {
		try{
			let id = req.params.id?req.params.id:0;
			let no_kk = req.params.no_kk?req.params.no_kk:0;

			let query = [
				{
					$lookup:{
						from: 'keluarga_penduduks',
						localField: '_id',
						foreignField: 'penduduk_id',
						// pipeline: [
						// 	{
						// 		$lookup:{
						// 			from: 'keluargas',
						// 			localField: 'keluarga_id',
						// 			foreignField: '_id',
						// 			pipeline: [
						// 				{
						// 					$project: { 
						// 						no_kk: '$no_kk',
						// 						kb: '$kb',
						// 						nik_kepala: '$nik_kepala',
						// 					}
						// 				}
						// 			],
						// 			as: 'keluarga'
						// 		},
						// 	}, 
						// 	{ $unwind: "$keluarga" },
						// ],
						as: 'keluarga_penduduk',
					},
				},
			];

			if(id != 0){
				query.push({ $match: { _id: db.mongoose.Types.ObjectId(id) } });
			}
			let data = await table.aggregate(query)

			data = await Promise.all(data.map(async dt => {

				return {
					_id: dt._id,
					nama: dt.nama,
					nik: dt.nik,
					jk: dt.jk,
					lahir: dt.lahir,
					alamat: dt.alamat,
					status_pernikahan: dt.status_pernikahan,
					pendidikan_id: dt.pendidikan_id,
					data: dt.data,
					hidup: dt.hidup,
					keluarga_penduduk: await Promise.all(dt.keluarga_penduduk.map(async e => {
						let keluarga = await db.keluarga.findById(e.keluarga_id);
						return {
							_id: e._id,
							keluarga_id: e.keluarga_id,
							penduduk_id: e.penduduk_id,
							level: e.level,
							kepala: e.kepala,
							keluarga: keluarga,
						}
					}))
				}
			}));

			

			// let data = await table.findById(id);
			if (!data[0]) return res.status(400).send({
				statusCode: 400,
				message: "Data not found",
			});
			else return res.send({statusCode: 200, data: data[0]});
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
			
			req.files = req.files?req.files:[];
			let kk_image = req.files.kk_image;
			let ktp_image = req.files.ktp_image;
			let no_kk = req.body.no_kk;
			let nik = req.body.nik;
			let nama = req.body.nama;
			let jk = req.body.jk;
			let lahirTempat = req.body.lahirTempat;
			let lahirTgl = req.body.lahirTgl;
			let agama = req.body.agama;
			let alamat = req.body.alamat;
			let rw = req.body.rw;
			let rt = req.body.rt;
			let dusun = req.body.dusun;
			let fisik = req.body.fisik;
			let fisikKet = req.body.fisikKet;
			let statKawin = req.body.statKawin;
			let statPendidikan = req.body.statPendidikan;
			let longitude = req.body.longitude;
			let latitude = req.body.latitude;
			let wilayah = req.body.wilayah;
			let hidup = req.body.hidup;
			let kb = req.body.kb;

			let hubungan_keluarga = req.body.hubungan_keluarga;
			let kepala_keluarga = hubungan_keluarga == '1'?true:false;

			let penyakit_id = req.body.penyakit_id;
			let penyakit_ket = req.body.penyakit_ket;
			
			
			let provinsi = await db.wil_provinsi.find({kode: wilayah.slice(0, 2)});
			let kabupaten = await db.wil_kabupaten.find({kode: wilayah.slice(0, 4)});
			let kecamatan = await db.wil_kecamatan.find({kode: wilayah.slice(0, 7)});
			let desa = await db.wil_desa.find({kode: wilayah.slice(0, 10)});
			
			let datetime = new Date().getTime();
			kk_image = await upload.upload(kk_image, no_kk+'_'+datetime+'.gif', '/keluarga/kk/')
			ktp_image = await upload.upload(ktp_image, nik+'_'+datetime+'.gif', '/keluarga/ktp/')

			// insert data keluarga
			let cekNoKK = await db.keluarga.find({ no_kk: no_kk });
			let kk_id = '';
			if(cekNoKK.length > 0){
				kk_id = cekNoKK[0]._id;
				if(kepala_keluarga){
					await db.keluarga.findByIdAndUpdate(kk_id, {nik_kepala: nik}, {useFindAndModify: false,});
				}

				if(kk_image.status){
					await db.keluarga.findByIdAndUpdate(kk_id, {kk_image: kk_image.file}, {useFindAndModify: false,});
				}

			}else{
				kepala_keluarga = true;

				let tmpKeluarga = {
					no_kk: no_kk,
					kb: kb,
					nik_kepala: nik
				};
				
				if(kk_image.status){
					tmpKeluarga['kk_image'] = kk_image.file;
				}

				let dataKK = await db.keluarga.create(tmpKeluarga);
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
					rw: rw,
					rt: rt,
					dusun: dusun,
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
				penyakit: {
					penyakit_id: penyakit_id,
					keterangan: penyakit_ket,
				}
			};

			if(ktp_image.status){
				dataPenduduk['ktp_image'] = ktp_image.file;
			}

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
			if(kepala_keluarga){
				await db.keluarga_penduduk.updateMany({ keluarga_id: kk_id }, {kepala: false}, {useFindAndModify: false,});
			}
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
				message: err.message || "Some error occurred while retrieving data.",
			});
		}
		return res.send({
			statusCode: 200,
			message: 'Data was saved.',
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