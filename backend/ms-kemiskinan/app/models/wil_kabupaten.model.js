import mongoose from "mongoose";
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
        comment: '1. Kota, 2. Kabupaten'
			},
    },
    { timestamps: true }
  );
	// ki => kesejahteraan indikator
  const Table = mongoose.model('wil_kabupaten', schema);
  return Table
}