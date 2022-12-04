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
        {
          $lookup: {
            from: 'penduduk_pekerjaans',
            localField: '_id',
            foreignField: 'penduduk_id',
            pipeline: [
              {
                $lookup: {
                  from: 'pekerjaans',
                  localField: 'pekerjaan_id',
                  foreignField: '_id',
                  as: 'pekerjaan',
                },
              },
              { $unwind: "$pekerjaan" },
              { $project: {
                pekerjaan_id: '$pekerjaan_id',
                pekerjaan_nama: '$pekerjaan.nama',
                gaji: '$gaji',
                keterangan: '$keterangan',
              } }
            ],
            as: 'pekerjaan',
          },
        },
        
        // { $unwind: "$penyakit_diderita" },
        { $match: { 
          'alamat.kecamatan_kode': { $regex: new RegExp(kecamatan), $options: "i" },
          'alamat.kelurahan_kode': { $regex: new RegExp(kelurahan), $options: "i" }
        } },
        {
          $project: {
            nama: '$nama',
            nik: '$nik',
            jk: '$jk',
            agama: '$agama',
            lahir: '$lahir',
            alamat: '$alamat',
            status_pernikahan: '$status_pernikahan',
            fisik: '$fisik',
            pendidikan_id: '$pendidikan_id',
            penyakit: {
              penyakit_id: '$penyakit.penyakit_id',
              nama: { $arrayElemAt: ['$penyakit_diderita.nama', 0] },
              keterangan: '$penyakit.keterangan',
            },
            pekerjaan: '$pekerjaan',
            hidup: '$hidup',
          }
        }
      ]);
      
      return res.send({statusCode: 200, data: data});
    }catch(err){
      return res.send({statusCode: 500, message: err});
    }
	}
  
	static async keluarga(req, res) {
    try{

      let kabupaten = req.body.kabupaten?req.body.kabupaten:'';
      let kecamatan = req.body.kecamatan?req.body.kecamatan:'';
      let kelurahan = req.body.kelurahan?req.body.kelurahan:'';

      let data = await db.keluarga.aggregate([
				{
					$lookup:{
						from: 'keluarga_penduduks',
						localField: '_id',
						foreignField: 'keluarga_id',
						pipeline: [
							{
								$lookup:{
									from: 'penduduks',
									localField: 'penduduk_id',
									foreignField: '_id',
									pipeline: [
										{
											$lookup: {
												from: 'penyakits',
												localField: 'penyakit.penyakit_id',
												foreignField: '_id',
												as: 'penyakit_diderita',
											},
										},
										{
											$lookup: {
												from: 'penduduk_pekerjaans',
												localField: '_id',
												foreignField: 'penduduk_id',
                        pipeline: [
                          {
                            $lookup: {
                              from: 'pekerjaans',
                              localField: 'pekerjaan_id',
                              foreignField: '_id',
                              as: 'pekerjaan',
                            },
                          },
                          { $unwind: "$pekerjaan" },
                          { $project: {
                            pekerjaan_id: '$pekerjaan_id',
                            pekerjaan_nama: '$pekerjaan.nama',
                            gaji: '$gaji',
                            keterangan: '$keterangan',
                          } }
                        ],
												as: 'pekerjaan',
											},
										},
									],
									as: 'penduduk'
								},
							}, 
							{ $unwind: "$penduduk" },
              {
                $project: {
                  penduduk_id: '$penduduk_id',
                  level: '$level',
                  kepala_keluarga: '$kepala',
                  nama: '$penduduk.nama',
                  nik: '$penduduk.nik',
                  jk: '$penduduk.jk',
                  agama: '$penduduk.agama',
                  lahir: '$penduduk.lahir',
                  alamat: '$penduduk.alamat',
                  status_pernikahan: '$penduduk.status_pernikahan',
                  fisik: '$penduduk.fisik',
                  pendidikan_id: '$penduduk.pendidikan_id',
                  penyakit: {
                    penyakit_id: '$penduduk.penyakit.penyakit_id',
                    nama: { $arrayElemAt: ['$penduduk.penyakit_diderita.nama', 0] },
                    keterangan: '$penduduk.penyakit.keterangan',
                  },
                  pekerjaan: '$penduduk.pekerjaan',
                  hidup: '$penduduk.hidup',
                }
              }
						],
						as: 'anggota_keluarga', 
					},
				},
        { $match: { 
          'anggota_keluarga.alamat.kabupaten_kode': { $regex: new RegExp(kabupaten), $options: "i" },
          'anggota_keluarga.alamat.kecamatan_kode': { $regex: new RegExp(kecamatan), $options: "i" },
          'anggota_keluarga.alamat.kelurahan_kode': { $regex: new RegExp(kelurahan), $options: "i" }
        } }
			]);
      
      return res.send({statusCode: 200, data: data});
    }catch(err){
      return res.send({statusCode: 500, message: err});
    }
	}
}