import dbConfig from "../config/db.config";
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// list of models
db.admin = require('./admin.model.js')(mongoose)
db.login = require('./login.model.js')(mongoose)
db.pegawai = require('./pegawai.model.js')(mongoose)
db.penduduk = require('./penduduk.model.js')(mongoose)

module.exports = db
