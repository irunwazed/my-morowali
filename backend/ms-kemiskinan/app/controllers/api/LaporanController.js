const paginate = require("../../libraries/paginate");
const db = require("../../models");

exports.controller = class LaporanController {
	static async penduduk(req, res) {
    try{

      let year = new Date().getFullYear();

      let datatable = req.query.datatable=='true'?true:false;
      let kabupaten = req.query.kabupaten?req.query.kabupaten:'';
      let kecamatan = req.query.kecamatan?req.query.kecamatan:'';
      let kelurahan = req.query.kelurahan?req.query.kelurahan:'';
			let search = req.query.search?req.query.search:{ value: '', regex: false };
      
      
      let match = {}
      if(kabupaten!='') match['alamat.kabupaten_kode'] = kabupaten;
      if(kecamatan!='') match['alamat.kecamatan_kode'] = kecamatan;
      if(kelurahan!='') match['alamat.kelurahan_kode'] = kelurahan;
      
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
        { $match: match },
      ];
      

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
						kondisi: fisik[e.fisik?e.fisik.fisik_id:0],
						keterangan: e.fisik?e.fisik.keterangan:'-',
					},
          pendidikan: pendidikan[e.pendidikan_id],
          penyakit: {
            nama: e.penyakit?e.penyakit.nama:'-',
            keterangan: e.penyakit?e.penyakit.keterangan:'',
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
			let search = req.query.search?req.query.search:{ value: '', regex: false };

      let match = {}
      if(kabupaten!='') match['alamat.kabupaten_kode'] = kabupaten;
      if(kecamatan!='') match['alamat.kecamatan_kode'] = kecamatan;
      if(kelurahan!='') match['alamat.kelurahan_kode'] = kelurahan;


      let query = [
        {
          $lookup: {
            from: 'penduduks',
            localField: 'nik_kepala',
            foreignField: 'nik',
            as: 'anggota_keluarga',
          },
        },
        {
          $match: {
            anggota_keluarga: {
              $elemMatch: match
            }
          }
        },
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
                kondisi: fisik[ak.fisik?ak.fisik.fisik_id:0],
                keterangan: ak.fisik?ak.fisik.keterangan:'-',
              },
              pendidikan: pendidikan[ak.pendidikan_id],
              penyakit: {
                nama: ak.penyakit?ak.penyakit.nama:'',
                keterangan: ak.penyakit?ak.penyakit.keterangan:'',
              },
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
      let status_kesejahteraan = req.query.status_kesejahteraan?req.query.status_kesejahteraan:1;
      let tahun = req.query.tahun?req.query.tahun:null;

      let match = {}
      if(kabupaten!='') match['keluarga.kepala_keluarga.alamat.kabupaten_kode'] = kabupaten;
      if(kecamatan!='') match['keluarga.kepala_keluarga.alamat.kecamatan_kode'] = kecamatan;
      if(kelurahan!='') match['keluarga.kepala_keluarga.alamat.kelurahan_kode'] = kelurahan;

      if(status_kesejahteraan != null) match['status_kesejahteraan'] = parseInt(status_kesejahteraan);  
      if(tahun != null) match['tahun'] = parseInt(tahun);;

      let query = [
				{
					$lookup:{
						from: 'keluargas',
						localField: 'keluarga_id',
						foreignField: '_id',
            pipeline:[
              {
                $lookup:{
                  from: 'penduduks',
                  localField: 'nik_kepala',
                  foreignField: 'nik',
                  as: 'kepala_keluarga'
                },
              },
            ],
						as: 'keluarga'
					},
				}, 
        {
          $match: match
        }
      ]
      
      let data = [];
      let tmp = {};
      if(datatable){
        tmp = await paginate.aggregate(req, 'keluarga_kesejahteraan', query);
        data = tmp.data;
      }else{
        data = await db.keluarga.aggregate(query);;
      }

      let kesejahteraan = ['', 'Sangat Miskin', 'Miskin', 'Rentan Miskin', 'Menuju Miskin', 'Middle Class'];
      let pendidikan = ['', 'Tidak/belum sekolah', 'Tidak tamat SD/sederajat', 'Tamat SD/sederajat', 'Siswa SMP/sederajat', 'Tamat SMP/sederajat', 'Siswa SMA/sederajat', 'Tamat SMA/sederajat', 'Mahasiswa Perguruan Tinggi', 'Tamat Perguruan Tinggi'];  
      let status_pernikahan = ['', 'Belum Menikah', 'Cerai Hidup', 'Cerai Mati', 'Kawin'];
      let fisik = ['', 'Lainnya', 'Sehat', 'Cacat'];
      let agama = ['', 'Islam', 'Kristen', 'Khatolik', 'Hindu', 'Buddha', 'Konghucu'];

      let dataAll = data.map(e => {
        e.keluarga[0] = e.keluarga[0]?e.keluarga[0]:{kepala_keluarga:[]};
        e.keluarga[0].kepala_keluarga[0] = e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0]:{};
        return {
          tahun: e.tahun,
          status_kesejahteraan: kesejahteraan[e.status_kesejahteraan],
          keuangan: e.keuangan,
          indikator: e.indikator,
          kepala_keluarga: {
            no_kk: e.keluarga[0].no_kk,
            nama: e.keluarga[0].kepala_keluarga[0].nama,
            nik: e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].nik:'',
            jk: (e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].jk:'')=='P'?'Perempuan':'Laki - Laki',
            agama: agama[e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].agama:0],
            lahir: e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].lahir:'',
            alamat: e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].alamat:'',
            fisik: {
              kondisi: fisik[e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].fisik?e.keluarga[0].kepala_keluarga[0].fisik.fisik_id:0:0],
              keterangan: e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].fisik?e.keluarga[0].kepala_keluarga[0].fisik.keterangan:'-':'-',
            },
            pendidikan_id: pendidikan[e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].pendidikan_id:0],
            penyakit: e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].penyakit:'',
            pekerjaan: e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].pekerjaan?e.keluarga[0].kepala_keluarga[0].pekerjaan.map(pk => { return {pekerjaan_nama: pk.pekerjaan_nama, gaji: pk.gaji, keterangan: pk.keterangan, } }):[]:[],
            hidup: e.keluarga[0].kepala_keluarga[0]?e.keluarga[0].kepala_keluarga[0].hidup:false?'Ya':'Tidak',
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