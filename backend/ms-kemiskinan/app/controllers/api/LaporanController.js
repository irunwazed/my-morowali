import db from "../../models";

export default class LaporanController {
	static async penduduk(req, res) {

    try{

      let kecamatan = req.body.kecamatan?req.body.kecamatan:'';
      let kelurahan = req.body.kelurahan?req.body.kelurahan:'';

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
        { $match: { 
          'alamat.kecamatan_kode': { $regex: new RegExp(kecamatan), $options: "i" },
          'alamat.kelurahan_kode': { $regex: new RegExp(kelurahan), $options: "i" }
        } }
      ]);
      
      return res.send({statusCode: 200, data: data});
    }catch(err){
      return res.send({statusCode: 500, message: err});
    }

    
	}
}