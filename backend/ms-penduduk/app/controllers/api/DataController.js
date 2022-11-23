import db from "../../models";

const table = db.penduduk;

export default class DataController {

	static async getPendudukByNIK(req, res) {
		let nik = req.params.nik;
		try{
			let data = await db.penduduk.find({nik: nik});
			return res.send(data);
		}catch(err){
			return res.status(500).send({
				message: err.message || "Data invalid",
			});
		}
	}

}