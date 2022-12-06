const express = require('express');
const userMiddleware = require('../middleware/UserMiddleware');

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
  return exports[name].controller[(_route.length==1?'index':_route[1])];
}

// . setting

const router = express.Router();

// API
router.get("/", route('api/HomeController@index'));
router.use('/api', userMiddleware.getSession);
router.get("/api", route('api/HomeController@index'));

router.get("/api/data/penyakit", route('api/data/PenyakitController@getData'));
router.get("/api/data/penyakit/:id", route('api/data/PenyakitController@getOneData'));
router.post("/api/data/penyakit", route('api/data/PenyakitController@store', true), route('api/data/PenyakitController@store'));
router.put("/api/data/penyakit/:id", route('api/data/PenyakitController@store', true), route('api/data/PenyakitController@update'));
router.delete("/api/data/penyakit/:id", route('api/data/PenyakitController@delete'));

// get data
router.get("/api/get/opd", route('api/DataController@getOPD'))
router.get("/api/get/opd/:kode", route('api/DataController@getOPDByKode'))

router.get("*", route('api/HomeController@notFound'));
router.post("*", route('api/HomeController@notFound'));
router.put("*", route('api/HomeController@notFound'));
router.delete("*", route('api/HomeController@notFound'));
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({statusCode: 500, message: 'Server sedang bermasalah'});
});

module.exports = router;