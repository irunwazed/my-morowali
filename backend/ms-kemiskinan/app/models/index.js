import dbConfig from "../config/db.config";
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// list of models
db.bantuan = require('./bantuan.model.js')(mongoose);
db.penyakit = require('./penyakit.model.js')(mongoose);
db.pekerjaan = require('./pekerjaan.model.js')(mongoose);
db.penduduk = require('./penduduk.model.js')(mongoose);
db.penduduk_bantuan = require('./penduduk_bantuan.model.js')(mongoose);
db.penduduk_pekerjaan = require('./penduduk_pekerjaan.model.js')(mongoose);
db.keluarga = require('./keluarga.model.js')(mongoose);
db.keluarga_penduduk = require('./keluarga_penduduk.model.js')(mongoose);
db.keluarga_kesejahteraan = require('./keluarga_kesejahteraan.model.js')(mongoose);
db.ki_atap = require('./ki_atap.model.js')(mongoose);
db.ki_bahan_bakar = require('./ki_bahan_bakar.model.js')(mongoose);
db.ki_dinding = require('./ki_dinding.model.js')(mongoose);
db.ki_jamban = require('./ki_jamban.model.js')(mongoose);
db.ki_lantai = require('./ki_lantai.model.js')(mongoose);
db.ki_penerangan = require('./ki_penerangan.model.js')(mongoose);
db.ki_rumah = require('./ki_rumah.model.js')(mongoose);
db.ki_sumber_air = require('./ki_sumber_air.model.js')(mongoose);
db.wil_provinsi = require('./wil_provinsi.model.js')(mongoose);
db.wil_kabupaten = require('./wil_kabupaten.model.js')(mongoose);
db.wil_kecamatan = require('./wil_kecamatan.model.js')(mongoose);
db.wil_desa = require('./wil_desa.model.js')(mongoose);

module.exports = db;
