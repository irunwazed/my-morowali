const paginate = require("../../libraries/paginate");
const db = require("../../models");

exports.controller = class LaporanController {
	static async penduduk(req, res) {
    try{

      let datatable = req.query.datatable=='true'?true:false;
      let kabupaten = req.query.kabupaten?req.query.kabupaten:'';
      let kecamatan = req.query.kecamatan?req.query.kecamatan:'';
      let kelurahan = req.query.kelurahan?req.query.kelurahan:'';

      let query = [
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
        {
          $lookup: {
            from: 'penduduk_bantuans',
            localField: '_id',
            foreignField: 'penduduk.penduduk_id',
            pipeline: [
              {
                $project: {
                  tahun: '$tahun',
                  bantuan: {
                    nama: '$bantuan.nama',
                    pagu: '$bantuan.pagu',
                    keterangan: '$bantuan.keterangan',
                  },
                  lokasi: '$lokasi',
                }
              }
            ],
            as: 'bantuan',
          },
        },
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
            bantuan: '$bantuan',
            hidup: '$hidup',
          }
        },
        { $match: { 
          'alamat.kabupaten_kode': { $regex: new RegExp(kabupaten), $options: "i" },
          'alamat.kecamatan_kode': { $regex: new RegExp(kecamatan), $options: "i" },
          'alamat.kelurahan_kode': { $regex: new RegExp(kelurahan), $options: "i" }
        } },
      ];
      console.log(query)

      let data = [];
      let tmp = [];
      if(datatable){
        tmp = await paginate.aggregate(req, 'penduduk', query);
        data = tmp.data;
      }else{
        data = await db.penduduk.aggregate(query);
      }
      

      
      let pendidikan = ['', 'Tidak punya ijazah', 'SD', 'SMP', 'SMA', 'S1', 'S2', 'S3'];
      let status_pernikahan = ['', 'Belum Menikah', 'Menikah', 'Duda', 'Janda'];
      let fisik = ['', 'Lainnya', 'Sehat', 'Cacat'];
      let agama = ['', 'Islam', 'Kristen', 'Khatolik', 'Hindu', 'Buddha', 'Konghucu']; 

      let dataAll = data.map(e => {
        return {
          nama: e.nama,
          nik: e.nik,
          jenis_kelamin: e.jk=='P'?'Perempuan':'Laki - Laki',
          agama: agama[e.agama],
          lahir: e.lahir,
          alamat: e.alamat,
          status_pernikahan: status_pernikahan[e.status_pernikahan],
					fisik: {
						kondisi: fisik[e.fisik.fisik_id],
						keterangan: e.fisik.keterangan,
					},
          pendidikan: pendidikan[e.pendidikan_id],
          penyakit: {
            nama: e.penyakit.nama,
            keterangan: e.penyakit.keterangan,
          },
          pekerjaan: e.pekerjaan.map(pk => { return {pekerjaan_nama: pk.pekerjaan_nama, gaji: pk.gaji, keterangan: pk.keterangan, } }),
          bantuan: e.bantuan,
          hidup: e.hidup?'Ya':'Tidak',
        }
      });

      if(datatable){
        tmp.data = dataAll;
        data = tmp;
        return res.send(data);
      }
      
      return res.send({statusCode: 200, data: dataAll});
    }catch(err){
      return res.send({statusCode: 500, message: err});
    }
	}
  
	static async keluarga(req, res) {
    try{

      let datatable = req.query.datatable=='true'?true:false;
      let kabupaten = req.query.kabupaten?req.query.kabupaten:'';
      let kecamatan = req.query.kecamatan?req.query.kecamatan:'';
      let kelurahan = req.query.kelurahan?req.query.kelurahan:'';

      let query = [
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
			];

      let data = [];
      let tmp = {};
      if(datatable){
        tmp = await paginate.aggregate(req, 'keluarga', query);
        data = tmp.data;
      }else{
        data = await db.keluarga.aggregate(query);
      }

      let hubKel = ['', 'Istri / Suami', 'Anak', 'Wali', 'Lainnya'];  
      let pendidikan = ['', 'Tidak punya ijazah', 'SD', 'SMP', 'SMA', 'S1', 'S2', 'S3'];
      let status_pernikahan = ['', 'Belum Menikah', 'Menikah', 'Duda', 'Janda'];
      let fisik = ['', 'Lainnya', 'Sehat', 'Cacat'];
      let agama = ['', 'Islam', 'Kristen', 'Khatolik', 'Hindu', 'Buddha', 'Konghucu'];

      let dataAll = data.map(e => {
        return {
          no_kk: e.no_kk,
          nik_kepala: e.nik_kepala,
          anggota_keluarga: e.anggota_keluarga.map(ak => {
            return {
              kepala_keluarga: ak.kepala_keluarga?'Ya':'Tidak',
              nama: ak.nama,
              nik: ak.nik,
              hubungan_keluarga: hubKel[ak.level],
              jenis_kelamin: ak.jk=='P'?'Perempuan':'Laki - Laki',
              agama: agama[ak.agama],
              lahir: ak.lahir,
              alamat: ak.alamat,
              status_pernikahan: status_pernikahan[ak.status_pernikahan],
              fisik: {
                kondisi: fisik[ak.fisik.fisik_id],
                keterangan: ak.fisik.keterangan,
              },
              pendidikan: pendidikan[ak.pendidikan_id],
              penyakit: {
                nama: ak.penyakit.nama,
                keterangan: ak.penyakit.keterangan,
              },
              pekerjaan: ak.pekerjaan.map(pk => { return {pekerjaan_nama: pk.pekerjaan_nama, gaji: pk.gaji, keterangan: pk.keterangan, } }),
              hidup: ak.hidup?'Ya':'Tidak',
            }
          }),
        }
      });

      if(datatable){
        tmp.data = dataAll;
        data = tmp;
        return res.send(data);
      }
      
      return res.send({statusCode: 200, data: dataAll});
    }catch(err){
      return res.send({statusCode: 500, message: err});
    }
	}

  static async kesejahteraan(req, res){
    try{
      let datatable = req.query.datatable=='true'?true:false;
      let kabupaten = req.query.kabupaten?req.query.kabupaten:'';
      let kecamatan = req.query.kecamatan?req.query.kecamatan:'';
      let kelurahan = req.query.kelurahan?req.query.kelurahan:'';

      let query = [
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
                  pipeline: [
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
              {
                $project: {
                  // keluarga_id: '$_id',
                  // penduduk_id: { $arrayElemAt: ['$penduduk._id', 0] },
                  no_kk: '$no_kk',
                  kepala_keluarga: {
                    nama: { $arrayElemAt: ['$penduduk.nama', 0] },
                    nik: { $arrayElemAt: ['$penduduk.nik', 0] },
                    jk: { $arrayElemAt: ['$penduduk.jk', 0] },
                    agama: { $arrayElemAt: ['$penduduk.agama', 0] },
                    lahir: { $arrayElemAt: ['$penduduk.lahir', 0] },
                    alamat: { $arrayElemAt: ['$penduduk.alamat', 0] },
                    fisik: { $arrayElemAt: ['$penduduk.fisik', 0] },
                    pendidikan_id: { $arrayElemAt: ['$penduduk.pendidikan_id', 0] },
                    penyakit: { $arrayElemAt: ['$penduduk.penyakit', 0] },
                    pekerjaan: { $arrayElemAt: ['$penduduk.pekerjaan', 0] },
                    hidup: { $arrayElemAt: ['$penduduk.hidup', 0] },
                  }
                }
              }
            ],
            as: 'keluarga'
          },
        }, 
			  { $unwind: "$keluarga" },
        // { $match: { 
        //   'anggota_keluarga.alamat.kabupaten_kode': { $regex: new RegExp(kabupaten), $options: "i" },
        //   'anggota_keluarga.alamat.kecamatan_kode': { $regex: new RegExp(kecamatan), $options: "i" },
        //   'anggota_keluarga.alamat.kelurahan_kode': { $regex: new RegExp(kelurahan), $options: "i" }
        // } }
      ];

      let data = [];
      let tmp = {};
      if(datatable){
        tmp = await paginate.aggregate(req, 'keluarga_kesejahteraan', query);
        data = tmp.data;
      }else{
        data = await db.keluarga_kesejahteraan.aggregate(query);;
      }

      let kesejahteraan = ['', 'Sangat Miskin', 'Miskin', 'Rentan Miskin', 'Menuju Miskin', 'Middle Class'];
      let pendidikan = ['', 'Tidak punya ijazah', 'SD', 'SMP', 'SMA', 'S1', 'S2', 'S3'];
      let status_pernikahan = ['', 'Belum Menikah', 'Menikah', 'Duda', 'Janda'];
      let fisik = ['', 'Lainnya', 'Sehat', 'Cacat'];
      let agama = ['', 'Islam', 'Kristen', 'Khatolik', 'Hindu', 'Buddha', 'Konghucu'];

      let dataAll = data.map(e => {
        return {
          tahun: e.tahun,
          status_kesejahteraan: kesejahteraan[e.status_kesejahteraan],
          keuangan: e.keuangan,
          indikator: e.indikator,
          kepala_keluarga: {
            no_kk: e.keluarga.no_kk,
            nama: e.keluarga.kepala_keluarga.nama,
            nik: e.keluarga.kepala_keluarga.nik,
            jk: e.keluarga.kepala_keluarga.jk=='P'?'Perempuan':'Laki - Laki',
            agama: agama[e.keluarga.kepala_keluarga.agama],
            lahir: e.keluarga.kepala_keluarga.lahir,
            alamat: e.keluarga.kepala_keluarga.alamat,
            fisik: {
              kondisi: fisik[e.keluarga.kepala_keluarga.fisik.fisik_id],
              keterangan: e.keluarga.kepala_keluarga.fisik.keterangan,
            },
            pendidikan_id: pendidikan[e.keluarga.kepala_keluarga.pendidikan_id],
            penyakit: e.keluarga.kepala_keluarga.penyakit,
            pekerjaan: e.keluarga.kepala_keluarga.pekerjaan.map(pk => { return {pekerjaan_nama: pk.pekerjaan_nama, gaji: pk.gaji, keterangan: pk.keterangan, } }),
            hidup: e.keluarga.kepala_keluarga.hidup?'Ya':'Tidak',
          },
        }
      });

      if(datatable){
        tmp.data = dataAll;
        data = tmp;
        return res.send(data);
      }

      return res.send({statusCode: 200, data: dataAll});

    }catch(err){
      return res.send({statusCode: 500, message: err});
    }
  }

  static async bantuan(req, res){
    try{
      let datatable = req.query.datatable=='true'?true:false;
      let kabupaten = req.query.kabupaten?req.query.kabupaten:'';
      let kecamatan = req.query.kecamatan?req.query.kecamatan:'';
      let kelurahan = req.query.kelurahan?req.query.kelurahan:'';

      let query = {};

      let data = [];
      let tmp = {};
      if(datatable){
        tmp = await paginate.find(req, 'penduduk_bantuan', query);
        data = tmp.data;
      }else{
        data = await db.penduduk_bantuan.find(query);;
      }

      let dataAll = data.map(e => {
        return {
          tahun: e.tahun,
          bantuan: e.bantuan,
          lokasi: e.lokasi,
          penduduk: e.penduduk,
          penduduk2: e.penduduk2,
        }
      });

      if(datatable){
        tmp.data = dataAll;
        data = tmp;
        return res.send(data);
      }

      return res.send({statusCode: 200, data: dataAll});

    }catch(err){
      return res.send({statusCode: 500, message: err});
    }
  }
}