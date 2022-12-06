const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      kode: {
				type: Number,
				required: true,
			},
      nama: {
				type: String,
				required: true,
			},
    },
    { timestamps: true }
  );
	// ki => kesejahteraan indikator
  const Table = mongoose.model('wil_kecamatan', schema);
  return Table
}