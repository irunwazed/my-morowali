import express from 'express';
import userMiddleware from '../middleware/UserMiddleware';
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
router.get("/api/tes", route('api/HomeController@index'))
router.post("/api/login", [
  check('username').isLength({ min: 2 }),
  check('password').exists(),
], route('api/LoginController@login'))
router.get("/api/cek-login", route('api/LoginController@cekLogin'))
router.use('/api', userMiddleware.checkApi);
router.put("/api/change-password", route('api/UsersController@changePassword'))

router.get("/api/users", route('api/UsersController@getData'))
router.get("/api/users/:id", route('api/UsersController@getOneData'))
router.post("/api/users", [
  check('username').isLength({ min: 2 }),
  check('password').exists(),
], route('api/UsersController@store'))
router.put("/api/users/:id", [
  check('username').isLength({ min: 2 }),
], route('api/UsersController@update'))
router.delete("/api/users/:id", route('api/UsersController@delete'))
router.delete("/api/users", route('api/UsersController@deleteAll'))

router.get("/api/pegawai", route('api/PegawaiController@getData'))
router.get("/api/pegawai/:id", route('api/PegawaiController@getOneData'))
router.post("/api/pegawai", [
  check('nama').isLength({ min: 2 }),
], route('api/PegawaiController@store'))
router.put("/api/pegawai/:id", [
  check('nama').isLength({ min: 2 }),
], route('api/PegawaiController@update'))
router.delete("/api/pegawai/:id", route('api/PegawaiController@delete'))
router.delete("/api/pegawai", route('api/PegawaiController@deleteAll'))

router.get("/api/opd", route('api/OpdController@getData'))
router.get("/api/opd/:id", route('api/OpdController@getOneData'))
router.post("/api/opd", [
  check('opd_nama').isLength({ min: 2 }),
], route('api/OpdController@store'))
router.put("/api/opd/:id", [
  check('opd_nama').isLength({ min: 2 }),
], route('api/OpdController@update'))
router.delete("/api/opd/:id", route('api/OpdController@delete'))
router.delete("/api/opd", route('api/OpdController@deleteAll'))

router.get("/api/pegawai-opd", route('api/PegawaiOpdController@getData'))
router.get("/api/pegawai-opd/:id", route('api/PegawaiOpdController@getOneData'))
router.post("/api/pegawai-opd", [
  check('opd_id').exists(),
  check('pegawai_id').exists(),
], route('api/PegawaiOpdController@store'))
router.put("/api/pegawai-opd/:id", [
  check('opd_id').exists(),
  check('pegawai_id').exists(),
], route('api/PegawaiOpdController@update'))
router.delete("/api/pegawai-opd/:id", route('api/PegawaiOpdController@delete'))
router.delete("/api/pegawai-opd", route('api/PegawaiOpdController@deleteAll'))
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