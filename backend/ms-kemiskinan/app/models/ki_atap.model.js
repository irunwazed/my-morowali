import mongoose from "mongoose";
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
	// ki => kesejahteraan indikator
  const Table = mongoose.model('ki_atap', schema);
  return Table
}