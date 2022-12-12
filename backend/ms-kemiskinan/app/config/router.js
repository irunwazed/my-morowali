const express = require('express');
const userMiddleware = require('../middleware/UserMiddleware');

// upload
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
		let name = file.originalname.split('.');
    cb(null, file.fieldname + '-' + Date.now()+'.'+name[name.length-1])
  }
});
var upload = multer({ storage: storage });

// setting export all Controller
var exports = {};
const route = (_route, validate = false) => {
  _route = _route.split("@")
  let path = '../controllers/'
  let name = _route[0].split("/").join("_")
  if(exports[name] == null){
    exports[name] = require(path+_route[0])
  }
  if(validate){
    return exports[name].validate[_route[1]];
  }
  return exports[name].controller[(_route.length==1?'index':_route[1])]
}

// . setting
;

const router = express.Router();
const routerAdmin = express.Router();
const routerUser = express.Router();

// Api
router.get("/", route('api/HomeController@index'));
router.use('/api', userMiddleware.checkUser);
router.get("/api", route('api/HomeController@index'));


// ADMIN
routerAdmin.use('/api', userMiddleware.checkAdmin);

routerAdmin.get("/api/penduduk/pekerjaan", route('api/PendudukPekerjaanController@getData'));
routerAdmin.get("/api/penduduk/pekerjaan/:id", route('api/PendudukPekerjaanController@getOneData'));
routerAdmin.post("/api/penduduk/pekerjaan", route('api/PendudukPekerjaanController@store', true), route('api/PendudukPekerjaanController@store'));
routerAdmin.put("/api/penduduk/pekerjaan/:id", route('api/PendudukPekerjaanController@store', true), route('api/PendudukPekerjaanController@store'));
routerAdmin.delete("/api/penduduk/pekerjaan/:id", route('api/PendudukPekerjaanController@delete'));

routerAdmin.get("/api/penduduk", route('api/PendudukController@getData'));
routerAdmin.get("/api/penduduk/no_kk/:no_kk", route('api/PendudukController@getOneData'));
routerAdmin.get("/api/penduduk/:id", route('api/PendudukController@getOneData'));
routerAdmin.post("/api/penduduk", route('api/PendudukController@store', true), route('api/PendudukController@store'));
routerAdmin.delete("/api/penduduk/:id", route('api/PendudukController@delete'));

routerAdmin.get("/api/keluarga", route('api/KeluargaController@getData'));
routerAdmin.get("/api/keluarga/no_kk/:no_kk", route('api/KeluargaController@getDataByKK'));
routerAdmin.get("/api/keluarga/:id", route('api/KeluargaController@getData'));
routerAdmin.delete("/api/keluarga/:id", route('api/KeluargaController@delete'));

routerAdmin.get("/api/kesejahteraan", route('api/KesejahteraanController@getData'));
routerAdmin.get("/api/kesejahteraan/:no_kk/:tahun", route('api/KesejahteraanController@getData'));
routerAdmin.get("/api/kesejahteraan/:id", route('api/KesejahteraanController@getData'));
routerAdmin.post("/api/kesejahteraan", upload.any(), route('api/KesejahteraanController@store', true), route('api/KesejahteraanController@store'));
routerAdmin.put("/api/kesejahteraan/:id", upload.any(), route('api/KesejahteraanController@store', true),  route('api/KesejahteraanController@store'));
routerAdmin.delete("/api/kesejahteraan/:id",  route('api/KesejahteraanController@delete'));


routerAdmin.get("/api/bantuan", route('api/BantuanController@getData'));
routerAdmin.get("/api/bantuan/:id", route('api/BantuanController@getOneData'));
routerAdmin.post("/api/bantuan", route('api/BantuanController@store', true), route('api/BantuanController@store'));
routerAdmin.put("/api/bantuan/:id", route('api/BantuanController@store', true), route('api/BantuanController@store'));
routerAdmin.delete("/api/bantuan/:id", route('api/BantuanController@delete'));

routerAdmin.get("/api/data/penyakit", route('api/data/PenyakitController@getData'));
routerAdmin.get("/api/data/penyakit/:id", route('api/data/PenyakitController@getOneData'));
routerAdmin.post("/api/data/penyakit", route('api/data/PenyakitController@store', true), route('api/data/PenyakitController@store'));
routerAdmin.put("/api/data/penyakit/:id", route('api/data/PenyakitController@store', true), route('api/data/PenyakitController@update'));
routerAdmin.delete("/api/data/penyakit/:id", route('api/data/PenyakitController@delete'));

routerAdmin.get("/api/data/pekerjaan", route('api/data/PekerjaanController@getData'));
routerAdmin.get("/api/data/pekerjaan/:id", route('api/data/PekerjaanController@getOneData'));
routerAdmin.post("/api/data/pekerjaan", route('api/data/PekerjaanController@store', true), route('api/data/PekerjaanController@store'));
routerAdmin.put("/api/data/pekerjaan/:id", route('api/data/PekerjaanController@store', true), route('api/data/PekerjaanController@update'));
routerAdmin.delete("/api/data/pekerjaan/:id", route('api/data/PekerjaanController@delete'));

routerAdmin.get("/api/data/bantuan", route('api/data/BantuanController@getData'));
routerAdmin.get("/api/data/bantuan/:id", route('api/data/BantuanController@getOneData'));
routerAdmin.post("/api/data/bantuan", route('api/data/BantuanController@store', true), route('api/data/BantuanController@store'));
routerAdmin.put("/api/data/bantuan/:id", route('api/data/BantuanController@store', true), route('api/data/BantuanController@update'));
routerAdmin.delete("/api/data/bantuan/:id", route('api/data/BantuanController@delete'));

// indikator
routerAdmin.get("/api/kesejahteraan/indikator/rumah", route('api/indikator/RumahController@getData'));
routerAdmin.get("/api/kesejahteraan/indikator/rumah/:id", route('api/indikator/RumahController@getOneData'));
routerAdmin.post("/api/kesejahteraan/indikator/rumah", route('api/indikator/RumahController@store', true), route('api/indikator/RumahController@store'));
routerAdmin.put("/api/kesejahteraan/indikator/rumah/:id", route('api/indikator/RumahController@store', true), route('api/indikator/RumahController@update'));
routerAdmin.delete("/api/kesejahteraan/indikator/rumah/:id", route('api/indikator/RumahController@delete'));

routerAdmin.get("/api/kesejahteraan/indikator/atap", route('api/indikator/AtapController@getData'));
routerAdmin.get("/api/kesejahteraan/indikator/atap/:id", route('api/indikator/AtapController@getOneData'));
routerAdmin.post("/api/kesejahteraan/indikator/atap", route('api/indikator/AtapController@store', true), route('api/indikator/AtapController@store'));
routerAdmin.put("/api/kesejahteraan/indikator/atap/:id", route('api/indikator/AtapController@store', true), route('api/indikator/AtapController@update'));
routerAdmin.delete("/api/kesejahteraan/indikator/atap/:id", route('api/indikator/AtapController@delete'));

routerAdmin.get("/api/kesejahteraan/indikator/bahan-bakar", route('api/indikator/BahanBakarController@getData'));
routerAdmin.get("/api/kesejahteraan/indikator/bahan-bakar/:id", route('api/indikator/BahanBakarController@getOneData'));
routerAdmin.post("/api/kesejahteraan/indikator/bahan-bakar", route('api/indikator/BahanBakarController@store', true), route('api/indikator/BahanBakarController@store'));
routerAdmin.put("/api/kesejahteraan/indikator/bahan-bakar/:id", route('api/indikator/BahanBakarController@store', true), route('api/indikator/BahanBakarController@update'));
routerAdmin.delete("/api/kesejahteraan/indikator/bahan-bakar/:id", route('api/indikator/BahanBakarController@delete'));

routerAdmin.get("/api/kesejahteraan/indikator/dinding", route('api/indikator/DindingController@getData'));
routerAdmin.get("/api/kesejahteraan/indikator/dinding/:id", route('api/indikator/DindingController@getOneData'));
routerAdmin.post("/api/kesejahteraan/indikator/dinding", route('api/indikator/DindingController@store', true), route('api/indikator/DindingController@store'));
routerAdmin.put("/api/kesejahteraan/indikator/dinding/:id", route('api/indikator/DindingController@store', true), route('api/indikator/DindingController@update'));
routerAdmin.delete("/api/kesejahteraan/indikator/dinding/:id", route('api/indikator/DindingController@delete'));

routerAdmin.get("/api/kesejahteraan/indikator/jamban", route('api/indikator/JambanController@getData'));
routerAdmin.get("/api/kesejahteraan/indikator/jamban/:id", route('api/indikator/JambanController@getOneData'));
routerAdmin.post("/api/kesejahteraan/indikator/jamban", route('api/indikator/JambanController@store', true), route('api/indikator/JambanController@store'));
routerAdmin.put("/api/kesejahteraan/indikator/jamban/:id", route('api/indikator/JambanController@store', true), route('api/indikator/JambanController@update'));
routerAdmin.delete("/api/kesejahteraan/indikator/jamban/:id", route('api/indikator/JambanController@delete'));

routerAdmin.get("/api/kesejahteraan/indikator/lantai", route('api/indikator/LantaiController@getData'));
routerAdmin.get("/api/kesejahteraan/indikator/lantai/:id", route('api/indikator/LantaiController@getOneData'));
routerAdmin.post("/api/kesejahteraan/indikator/lantai", route('api/indikator/LantaiController@store', true), route('api/indikator/LantaiController@store'));
routerAdmin.put("/api/kesejahteraan/indikator/lantai/:id", route('api/indikator/LantaiController@store', true), route('api/indikator/LantaiController@update'));
routerAdmin.delete("/api/kesejahteraan/indikator/lantai/:id", route('api/indikator/LantaiController@delete'));

routerAdmin.get("/api/kesejahteraan/indikator/penerangan", route('api/indikator/PeneranganController@getData'));
routerAdmin.get("/api/kesejahteraan/indikator/penerangan/:id", route('api/indikator/PeneranganController@getOneData'));
routerAdmin.post("/api/kesejahteraan/indikator/penerangan", route('api/indikator/PeneranganController@store', true), route('api/indikator/PeneranganController@store'));
routerAdmin.put("/api/kesejahteraan/indikator/penerangan/:id", route('api/indikator/PeneranganController@store', true), route('api/indikator/PeneranganController@update'));
routerAdmin.delete("/api/kesejahteraan/indikator/penerangan/:id", route('api/indikator/PeneranganController@delete'));

routerAdmin.get("/api/kesejahteraan/indikator/sumber-air", route('api/indikator/SumberAirController@getData'));
routerAdmin.get("/api/kesejahteraan/indikator/sumber-air/:id", route('api/indikator/SumberAirController@getOneData'));
routerAdmin.post("/api/kesejahteraan/indikator/sumber-air", route('api/indikator/SumberAirController@store', true), route('api/indikator/SumberAirController@store'));
routerAdmin.put("/api/kesejahteraan/indikator/sumber-air/:id", route('api/indikator/SumberAirController@store', true), route('api/indikator/SumberAirController@update'));
routerAdmin.delete("/api/kesejahteraan/indikator/sumber-air/:id", route('api/indikator/SumberAirController@delete'));

// laporan
routerAdmin.get("/api/laporan/penduduk", route('api/LaporanController@penduduk'));
routerAdmin.get("/api/laporan/keluarga", route('api/LaporanController@keluarga'));
routerAdmin.get("/api/laporan/kesejahteraan", route('api/LaporanController@kesejahteraan'));
routerAdmin.get("/api/laporan/bantuan", route('api/LaporanController@bantuan'));

// export import
routerAdmin.post("/api/eksport/penduduk", upload.any(), route('api/EksportController@penduduk'));
routerAdmin.post("/api/eksport/kesejahteraan", upload.any(), route('api/EksportKesejahteraanController@penduduk'));


// get data to foreign
routerAdmin.get("/api/get/penduduk", route('api/DataController@getPendudukBySearch'))
routerAdmin.get("/api/get/penduduk/:nik", route('api/DataController@getPendudukByNIK'))
routerAdmin.get("/api/get/keluarga/:no_kk", route('api/DataController@getKeluargaByNoKK'))
routerAdmin.get("/api/get/provinsi", route('api/DataController@getProvinsi'))
routerAdmin.get("/api/get/provinsi/:kode", route('api/DataController@getProvinsiKode'))
routerAdmin.get("/api/get/kabupaten", route('api/DataController@getKabupaten'))
routerAdmin.get("/api/get/kabupaten/:kode", route('api/DataController@getKabupatenKode'))
routerAdmin.get("/api/get/kecamatan", route('api/DataController@getKecamatan'))
routerAdmin.get("/api/get/kecamatan/:kode", route('api/DataController@getKecamatanByKode'))
routerAdmin.get("/api/get/kelurahan/:kode", route('api/DataController@getKelurahanByKode'))
routerAdmin.get("/api/get/kelurahan-by-kecamatan/:kode", route('api/DataController@getKelurahanByKodeKecamatan'))
routerAdmin.get("/api/get/ki/atap", route('api/DataController@getKIAtap'))
routerAdmin.get("/api/get/ki/bahan-bakar", route('api/DataController@getKIBahanBakar'))
routerAdmin.get("/api/get/ki/dinding", route('api/DataController@getKIDinding'))
routerAdmin.get("/api/get/ki/jamban", route('api/DataController@getKIJamban'))
routerAdmin.get("/api/get/ki/lantai", route('api/DataController@getKILantai'))
routerAdmin.get("/api/get/ki/penerangan", route('api/DataController@getKIPenerangan'))
routerAdmin.get("/api/get/ki/rumah", route('api/DataController@getKIRumah'))
routerAdmin.get("/api/get/ki/sumber-air", route('api/DataController@getKISumberAir'))
routerAdmin.get("/api/get/beranda", route('api/DataController@beranda'));


router.get("*", route('api/HomeController@notFound'));
router.post("*", route('api/HomeController@notFound'));
router.put("*", route('api/HomeController@notFound'));
router.delete("*", route('api/HomeController@notFound'));
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({statusCode: 500, message: 'Server sedang bermasalah'});
});

module.exports = {router, routerAdmin, routerUser};