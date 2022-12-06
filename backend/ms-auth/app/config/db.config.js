const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  url: "mongodb://127.0.0.1:27017/"+process.env.MONGODB_DB
};