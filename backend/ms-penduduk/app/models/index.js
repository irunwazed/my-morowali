import dbConfig from "../config/db.config";
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// list of models
db.bantuan = require('./bantuan.model.js')(mongoose);
db.fisik = require('./fisik.model.js')(mongoose);
db.pendidikan = require('./pendidikan.model.js')(mongoose);
db.penyakit = require('./penyakit.model.js')(mongoose);
db.pekerjaan = require('./pekerjaan.model.js')(mongoose);
db.penduduk = require('./penduduk.model.js')(mongoose);
db.keluarga = require('./keluarga.model.js')(mongoose);
db.keluarga_penduduk = require('./keluarga_penduduk.model.js')(mongoose);
db.keluarga_kesejahteraan = require('./keluarga_kesejahteraan.model.js')(mongoose);
db.penduduk_bantuan = require('./penduduk_bantuan.model.js')(mongoose);
db.penduduk_pekerjaan = require('./penduduk_pekerjaan.model.js')(mongoose);

module.exports = db;
