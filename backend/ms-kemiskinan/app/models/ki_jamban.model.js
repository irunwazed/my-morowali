const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      bobot: {
				type: Number,
				required: true,
			},
      keterangan: {
				type: String,
			},
    },
    { timestamps: true }
  );
  
  const Table = mongoose.model('ki_jamban', schema);
  return Table
}