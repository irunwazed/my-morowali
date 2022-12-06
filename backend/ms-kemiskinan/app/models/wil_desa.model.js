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
      level: {
				type: Number,
				required: true,
        comment: '1. Kelurahan, 2. Desa'
			},
    },
    { timestamps: true }
  );
	// ki => kesejahteraan indikator
  const Table = mongoose.model('wil_desa', schema);
  return Table
}