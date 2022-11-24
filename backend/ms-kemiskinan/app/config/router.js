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
router.use('/', userMiddleware.getSession);
router.get("/", route('api/HomeController@index'));
router.get("/api", route('api/HomeController@index'));
router.get("/api/penduduk", route('api/PendudukController@getData'));
router.get("/api/penduduk/:id", route('api/PendudukController@getOneData'));
router.post("/api/penduduk", route('api/PendudukController@store', true), route('api/PendudukController@store'));
router.put("/api/penduduk/:id", route('api/PendudukController@store', true), route('api/PendudukController@update'));
router.delete("/api/penduduk/:id", route('api/PendudukController@delete'));

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

// data
router.get("/api/penduduk/nik/:nik", route('api/DataController@getPendudukByNIK'))

// . Api

router.get("*", route('api/HomeController@notFound'));
router.post("*", route('api/HomeController@notFound'));
router.put("*", route('api/HomeController@notFound'));
router.delete("*", route('api/HomeController@notFound'));
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({statusCode: 500, message: 'Server sedang bermasalah'});
});

module.exports = router;