import dbConfig from "../config/db.config";
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// list of models
db.opd = require('./opd.model.js')(mongoose);

module.exports = db;
