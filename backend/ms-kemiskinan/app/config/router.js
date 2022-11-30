import express from 'express';
import userMiddleware from '../middleware/UserMiddleware';

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
  return exports[name].default[(_route.length==1?'index':_route[1])]
}

// . setting
;

const router = express.Router();

// Api
router.get("/", route('api/HomeController@index'));
router.use('/api', userMiddleware.getSession);
router.get("/api", route('api/HomeController@index'));
router.get("/api/penduduk", route('api/PendudukController@getData'));
router.get("/api/penduduk/:id", route('api/PendudukController@getOneData'));
router.post("/api/penduduk", route('api/PendudukController@store', true), route('api/PendudukController@store'));
router.delete("/api/penduduk/:id", route('api/PendudukController@delete'));

router.get("/api/keluarga", route('api/KeluargaController@getData'));
router.get("/api/keluarga/:id", route('api/KeluargaController@getData'));
router.delete("/api/keluarga/:id", route('api/KeluargaController@delete'));

router.get("/api/kesejahteraan", route('api/KesejahteraanController@getData'));
router.get("/api/kesejahteraan/:id", route('api/KesejahteraanController@getOneData'));
router.post("/api/kesejahteraan", route('api/KesejahteraanController@store', true), route('api/KesejahteraanController@store'));
router.put("/api/kesejahteraan/:id", route('api/KesejahteraanController@store', true), route('api/KesejahteraanController@store'));
router.delete("/api/kesejahteraan/:id", route('api/KesejahteraanController@delete'));

router.get("/api/data/penyakit", route('api/data/PenyakitController@getData'));
router.get("/api/data/penyakit/:id", route('api/data/PenyakitController@getOneData'));
router.post("/api/data/penyakit", route('api/data/PenyakitController@store', true), route('api/data/PenyakitController@store'));
router.put("/api/data/penyakit/:id", route('api/data/PenyakitController@store', true), route('api/data/PenyakitController@update'));
router.delete("/api/data/penyakit/:id", route('api/data/PenyakitController@delete'));

router.get("/api/data/pekerjaan", route('api/data/PekerjaanController@getData'));
router.get("/api/data/pekerjaan/:id", route('api/data/PekerjaanController@getOneData'));
router.post("/api/data/pekerjaan", route('api/data/PekerjaanController@store', true), route('api/data/PekerjaanController@store'));
router.put("/api/data/pekerjaan/:id", route('api/data/PekerjaanController@store', true), route('api/data/PekerjaanController@update'));
router.delete("/api/data/pekerjaan/:id", route('api/data/PekerjaanController@delete'));

router.get("/api/data/bantuan", route('api/data/BantuanController@getData'));
router.get("/api/data/bantuan/:id", route('api/data/BantuanController@getOneData'));
router.post("/api/data/bantuan", route('api/data/BantuanController@store', true), route('api/data/BantuanController@store'));
router.put("/api/data/bantuan/:id", route('api/data/BantuanController@store', true), route('api/data/BantuanController@update'));
router.delete("/api/data/bantuan/:id", route('api/data/BantuanController@delete'));

// indikator
router.get("/api/kesejahteraan/indikator/rumah", route('api/indikator/RumahController@getData'));
router.get("/api/kesejahteraan/indikator/rumah/:id", route('api/indikator/RumahController@getOneData'));
router.post("/api/kesejahteraan/indikator/rumah", route('api/indikator/RumahController@store', true), route('api/indikator/RumahController@store'));
router.put("/api/kesejahteraan/indikator/rumah/:id", route('api/indikator/RumahController@store', true), route('api/indikator/RumahController@update'));
router.delete("/api/kesejahteraan/indikator/rumah/:id", route('api/indikator/RumahController@delete'));

router.get("/api/kesejahteraan/indikator/atap", route('api/indikator/AtapController@getData'));
router.get("/api/kesejahteraan/indikator/atap/:id", route('api/indikator/AtapController@getOneData'));
router.post("/api/kesejahteraan/indikator/atap", route('api/indikator/AtapController@store', true), route('api/indikator/AtapController@store'));
router.put("/api/kesejahteraan/indikator/atap/:id", route('api/indikator/AtapController@store', true), route('api/indikator/AtapController@update'));
router.delete("/api/kesejahteraan/indikator/atap/:id", route('api/indikator/AtapController@delete'));

router.get("/api/kesejahteraan/indikator/bahan-bakar", route('api/indikator/BahanBakarController@getData'));
router.get("/api/kesejahteraan/indikator/bahan-bakar/:id", route('api/indikator/BahanBakarController@getOneData'));
router.post("/api/kesejahteraan/indikator/bahan-bakar", route('api/indikator/BahanBakarController@store', true), route('api/indikator/BahanBakarController@store'));
router.put("/api/kesejahteraan/indikator/bahan-bakar/:id", route('api/indikator/BahanBakarController@store', true), route('api/indikator/BahanBakarController@update'));
router.delete("/api/kesejahteraan/indikator/bahan-bakar/:id", route('api/indikator/BahanBakarController@delete'));

router.get("/api/kesejahteraan/indikator/dinding", route('api/indikator/DindingController@getData'));
router.get("/api/kesejahteraan/indikator/dinding/:id", route('api/indikator/DindingController@getOneData'));
router.post("/api/kesejahteraan/indikator/dinding", route('api/indikator/DindingController@store', true), route('api/indikator/DindingController@store'));
router.put("/api/kesejahteraan/indikator/dinding/:id", route('api/indikator/DindingController@store', true), route('api/indikator/DindingController@update'));
router.delete("/api/kesejahteraan/indikator/dinding/:id", route('api/indikator/DindingController@delete'));

router.get("/api/kesejahteraan/indikator/jamban", route('api/indikator/JambanController@getData'));
router.get("/api/kesejahteraan/indikator/jamban/:id", route('api/indikator/JambanController@getOneData'));
router.post("/api/kesejahteraan/indikator/jamban", route('api/indikator/JambanController@store', true), route('api/indikator/JambanController@store'));
router.put("/api/kesejahteraan/indikator/jamban/:id", route('api/indikator/JambanController@store', true), route('api/indikator/JambanController@update'));
router.delete("/api/kesejahteraan/indikator/jamban/:id", route('api/indikator/JambanController@delete'));

router.get("/api/kesejahteraan/indikator/lantai", route('api/indikator/LantaiController@getData'));
router.get("/api/kesejahteraan/indikator/lantai/:id", route('api/indikator/LantaiController@getOneData'));
router.post("/api/kesejahteraan/indikator/lantai", route('api/indikator/LantaiController@store', true), route('api/indikator/LantaiController@store'));
router.put("/api/kesejahteraan/indikator/lantai/:id", route('api/indikator/LantaiController@store', true), route('api/indikator/LantaiController@update'));
router.delete("/api/kesejahteraan/indikator/lantai/:id", route('api/indikator/LantaiController@delete'));

router.get("/api/kesejahteraan/indikator/penerangan", route('api/indikator/PeneranganController@getData'));
router.get("/api/kesejahteraan/indikator/penerangan/:id", route('api/indikator/PeneranganController@getOneData'));
router.post("/api/kesejahteraan/indikator/penerangan", route('api/indikator/PeneranganController@store', true), route('api/indikator/PeneranganController@store'));
router.put("/api/kesejahteraan/indikator/penerangan/:id", route('api/indikator/PeneranganController@store', true), route('api/indikator/PeneranganController@update'));
router.delete("/api/kesejahteraan/indikator/penerangan/:id", route('api/indikator/PeneranganController@delete'));

router.get("/api/kesejahteraan/indikator/sumber-air", route('api/indikator/SumberAirController@getData'));
router.get("/api/kesejahteraan/indikator/sumber-air/:id", route('api/indikator/SumberAirController@getOneData'));
router.post("/api/kesejahteraan/indikator/sumber-air", route('api/indikator/SumberAirController@store', true), route('api/indikator/SumberAirController@store'));
router.put("/api/kesejahteraan/indikator/sumber-air/:id", route('api/indikator/SumberAirController@store', true), route('api/indikator/SumberAirController@update'));
router.delete("/api/kesejahteraan/indikator/sumber-air/:id", route('api/indikator/SumberAirController@delete'));

// get data to foreign
router.get("/api/get/penduduk", route('api/DataController@getPendudukByNIK'))
router.get("/api/get/penduduk/:nik", route('api/DataController@getPendudukByNIK'))
router.get("/api/get/keluarga/:no_kk", route('api/DataController@getKeluargaByNoKK'))
router.get("/api/get/provinsi", route('api/DataController@getProvinsi'))
router.get("/api/get/provinsi/:kode", route('api/DataController@getProvinsiKode'))
router.get("/api/get/kabupaten", route('api/DataController@getKabupaten'))
router.get("/api/get/kabupaten/:kode", route('api/DataController@getKabupatenKode'))
router.get("/api/get/kecamatan", route('api/DataController@getKecamatan'))
router.get("/api/get/kecamatan/:kode", route('api/DataController@getKecamatanByKode'))
router.get("/api/get/kelurahan/:kode", route('api/DataController@getKelurahanByKode'))
router.get("/api/get/kelurahan-by-kecamatan/:kode", route('api/DataController@getKelurahanByKodeKecamatan'))


router.get("*", route('api/HomeController@notFound'));
router.post("*", route('api/HomeController@notFound'));
router.put("*", route('api/HomeController@notFound'));
router.delete("*", route('api/HomeController@notFound'));
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({statusCode: 500, message: 'Server sedang bermasalah'});
});

module.exports = router;