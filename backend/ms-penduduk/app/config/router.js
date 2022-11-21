import express from 'express';
import { check } from 'express-validator';

// setting export all Controller
const route = (_route) => {
  _route = _route.split("@")
  let path = '../controllers/'
  let name = _route[0].split("/").join("_")
  if(exports[name] == null){
    exports[name] = require(path+_route[0])
  }
  return exports[name].default[(_route.length==1?'index':_route[1])]
}
// . setting

const router = express.Router()

// Api
router.get("/", route('api/HomeController@index'))
router.get("/api", route('api/HomeController@index'))

router.get("/api/penduduk", route('api/PendudukController@getData'))
router.get("/api/penduduk/:id", route('api/PendudukController@getOneData'))
router.post("/api/penduduk", [
  check('username').isLength({ min: 2 }),
  check('password').exists(),
], route('api/PendudukController@store'))
router.put("/api/penduduk/:id", [
  check('username').isLength({ min: 2 }),
], route('api/PendudukController@update'))
router.delete("/api/penduduk/:id", route('api/PendudukController@delete'))
router.delete("/api/penduduk", route('api/PendudukController@deleteAll'))

// . Api


router.get("*", route('api/HomeController@notFound'))
router.post("*", route('api/HomeController@notFound'))
router.put("*", route('api/HomeController@notFound'))
router.delete("*", route('api/HomeController@notFound'))
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({statusCode: 500, message: 'Server sedang bermasalah'});
});

module.exports = router