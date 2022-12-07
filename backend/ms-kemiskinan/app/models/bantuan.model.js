const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
        unique: true,
			},
      opd: {
				kode: {type: String},
				nama: {type: String},
			},
      keterangan: {
				type: String,
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('bantuan', schema);
  return Table
}