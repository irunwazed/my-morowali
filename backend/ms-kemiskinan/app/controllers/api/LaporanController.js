import db from "../../models";

export default class LaporanController {
	static async penduduk(req, res) {

    let data = await db.penduduk.aggregate([
      {
        $lookup: {
          from: 'penyakits',
          localField: 'penyakit.penyakit_id',
          foreignField: '_id',
          as: 'penyakit_diderita',
        },
      },
      { $unwind: "$penyakit_diderita" },
      // { $match: { nik: nik } }
    ]);
		
		return res.send({statusCode: 200, data: data});
	}
}