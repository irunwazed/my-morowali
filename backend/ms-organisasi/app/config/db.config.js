import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  url: "mongodb://localhost:27017/"+process.env.MONGODB_DB
};