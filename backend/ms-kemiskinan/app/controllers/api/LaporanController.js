import db from "../../models";

export default class LaporanController {
	static async penduduk(req, res) {

    try{

      let kecamatan = req.body.kecamatan;
      let kelurahan = req.body.kelurahan;

      let data = await db.penduduk.aggregate([
        {
          $lookup: {
            from: 'penyakits',
            localField: 'penyakit.penyakit_id',
            foreignField: '_id',
            as: 'penyakit_diderita',
          },
        },
        // { $unwind: "$penyakit_diderita" },
        // { $match: { nik: nik } }
      ]);
      
      return res.send({statusCode: 200, data: data});
    }catch(err){
      return res.send({statusCode: 500, message: err});
    }

    
	}
}