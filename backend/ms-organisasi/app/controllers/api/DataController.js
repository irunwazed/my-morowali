import db from "../../models";

export default class DataController {

	static async getOPD(req, res) {
		try{
			let data = await db.opd.find();
			let dataAll = [];
			data.forEach(e => {
				dataAll.push({
					kode: e.kode,
					nama: e.nama,
					pimpinan: {
						nama: e.pimpinan.nama,
						nip: e.pimpinan.nip,
					},
				});
			});
			return res.send({
				statusCode: 200,
				data: dataAll,
			});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data invalid",
			});
		}
	}
	
	static async getOPDByKode(req, res) {
		let kode = req.params.kode;
		try{
			let data = await db.opd.find({kode: kode});
			let dataAll = {
				kode: data[0].kode,
				nama: data[0].nama,
				pimpinan: {
					nama: data[0].pimpinan.nama,
					nip: data[0].pimpinan.nip,
				},
			};
			return res.send({
				statusCode: 200,
				data: dataAll,
			});
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Data invalid",
			});
		}
	}
}