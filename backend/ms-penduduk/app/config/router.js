import express from 'express';
import { check } from 'express-validator';
import userMiddleware from '../middleware/UserMiddleware';

// setting export all Controller
var exports = {};
const route = (_route) => {
  _route = _route.split("@")
  let path = '../controllers/'
  let name = _route[0].split("/").join("_")
  if(exports[name] == null){
    exports[name] = require(path+_route[0])
  }
  return exports[name].default[(_route.length==1?'index':_route[1])]
}

const validate = (_route) => {
  _route = _route.split("@");
  let path = '../controllers/';
  let name = _route[0].split("/").join("_");
  if(exports[name] == null){
    exports[name] = require(path+_route[0]);
  }
  return exports[name].validate[_route[1]];
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
router.post("/api/penduduk", validate('api/PendudukController@store'), route('api/PendudukController@store'));
router.put("/api/penduduk/:id", validate('api/PendudukController@store'), route('api/PendudukController@update'));
router.delete("/api/penduduk/:id", route('api/PendudukController@delete'));

router.get("/api/data/fisik", route('api/data/FisikController@getData'));
router.get("/api/data/fisik/:id", route('api/data/FisikController@getOneData'));
router.post("/api/data/fisik", validate('api/data/FisikController@store'), route('api/data/FisikController@store'));
router.put("/api/data/fisik/:id", validate('api/data/FisikController@store'), route('api/data/FisikController@update'));
router.delete("/api/data/fisik/:id", route('api/data/FisikController@delete'));

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