import dbConfig from "../config/db.config";
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// list of models
db.users = require('./users.model.js')(mongoose)
db.opd = require('./opd.model.js')(mongoose)
db.pegawai = require('./pegawai.model.js')(mongoose)
db.pegawai_opd = require('./pegawai_opd.model.js')(mongoose)

module.exports = db
