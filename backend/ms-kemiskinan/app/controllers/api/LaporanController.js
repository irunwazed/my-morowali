const paginate = require("../../libraries/paginate");
const db = require("../../models");

exports.controller = class LaporanController {
	static async penduduk(req, res) {
    try{

      // return res.send({statusCode: 200, data: []});
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
            as: 'pekerjaan',
          },
        },
        {
          $lookup: {
            from: 'penduduk_bantuans',
            localField: '_id',
            foreignField: 'penduduk.penduduk_id',
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

      let dataAll = await  Promise.all(data.map( async e => {

        return {
          _id: e._id,
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
          pekerjaan: await Promise.all(e.pekerjaan.map( async pk => { 

            let kerjaan = await db.pekerjaan.findById(pk.pekerjaan_id);

            return {pekerjaan_nama: kerjaan.nama, gaji: pk.gaji, keterangan: pk.keterangan, 
            
          }})),
          bantuan: e.bantuan.map(bt => {
            return {
              tahun: bt.tahun,
              bantuan: {
                nama: bt.bantuan.nama,
                pagu: bt.bantuan.pagu,
                keterangan: bt.bantuan.keterangan,
              },
              lokasi: bt.lokasi,
            };
          }),
          hidup: e.hidup?'Ya':'Tidak',
        }
      }));

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

      let dataAll = await Promise.all(data.map( async e => {

        let anggota_keluarga = [];
        let anggota = await db.keluarga_penduduk.find({ keluarga_id: e._id }).sort({ level: 'asc' })
        
 
        return {
          no_kk: e.no_kk,
          nik_kepala: e.nik_kepala,
          anggota_keluarga: await  Promise.all(anggota.map( async ak => {
            let penduduk = await db.penduduk.findById(ak.penduduk_id)
            return {
              kepala_keluarga: ak.kepala?'Ya':'Tidak',
              nama: penduduk.nama,
              nik: penduduk.nik,
              hubungan_keluarga: hubKel[ak.level],
              jenis_kelamin: penduduk.jk=='P'?'Perempuan':'Laki - Laki',
              agama: agama[penduduk.agama],
              lahir: penduduk.lahir,
              alamat: penduduk.alamat,
              status_pernikahan: status_pernikahan[penduduk.status_pernikahan],
              fisik: {
                kondisi: fisik[penduduk.fisik?penduduk.fisik.fisik_id:0],
                keterangan: penduduk.fisik?penduduk.fisik.keterangan:'-',
              },
              pendidikan: pendidikan[penduduk.pendidikan_id],
              penyakit: {
                nama: penduduk.penyakit?penduduk.penyakit.nama:'',
                keterangan: penduduk.penyakit?penduduk.penyakit.keterangan:'',
              },
              hidup: penduduk.hidup?'Ya':'Tidak',
            }
          })),
        }
      }));

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
      // if(kabupaten!='') match['alamat.kabupaten_kode'] = kabupaten;
      // if(kecamatan!='') match['alamat.kecamatan_kode'] = kecamatan;
      // if(kelurahan!='') match['alamat.kelurahan_kode'] = kelurahan;

      if(status_kesejahteraan != null) match['status_kesejahteraan'] = parseInt(status_kesejahteraan);  
      if(tahun != null) match['tahun'] = parseInt(tahun);

      let query = [
        {
          $match: match
        },
      ]
      
      let data = [];
      let tmp = {};
      if(datatable){
        tmp = await paginate.aggregate(req, 'keluarga_kesejahteraan', query);
        await db.keluarga_kesejahteraan.populate(tmp.data, {path:"keluarga_id"});
        await db.keluarga_kesejahteraan.populate(tmp.data, {path:"kepala_keluarga"});
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
        return {
          tahun: e.tahun,
          status_kesejahteraan: kesejahteraan[e.status_kesejahteraan],
          keuangan: e.keuangan,
          indikator: e.indikator,
          kepala_keluarga: {
            no_kk: e.keluarga_id.no_kk,
            nama: e.kepala_keluarga.nama,
            nik: e.kepala_keluarga?e.kepala_keluarga.nik:'',
            jk: (e.kepala_keluarga?e.kepala_keluarga.jk:'')=='P'?'Perempuan':'Laki - Laki',
            agama: agama[e.kepala_keluarga?e.kepala_keluarga.agama:0],
            lahir: e.kepala_keluarga?e.kepala_keluarga.lahir:'',
            alamat: e.kepala_keluarga?e.kepala_keluarga.alamat:'',
            fisik: {
              kondisi: fisik[e.kepala_keluarga?e.kepala_keluarga.fisik?e.kepala_keluarga.fisik.fisik_id:0:0],
              keterangan: e.kepala_keluarga?e.kepala_keluarga.fisik?e.kepala_keluarga.fisik.keterangan:'-':'-',
            },
            pendidikan_id: pendidikan[e.kepala_keluarga?e.kepala_keluarga.pendidikan_id:0],
            penyakit: e.kepala_keluarga?e.kepala_keluarga.penyakit:'',
            pekerjaan: e.kepala_keluarga?e.kepala_keluarga.pekerjaan?e.kepala_keluarga.pekerjaan.map(pk => { return {pekerjaan_nama: pk.pekerjaan_nama, gaji: pk.gaji, keterangan: pk.keterangan, } }):[]:[],
            hidup: e.kepala_keluarga?e.kepala_keluarga.hidup:false?'Ya':'Tidak',
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
      console.log(err);
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