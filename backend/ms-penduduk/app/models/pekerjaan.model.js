import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      pekerjaan_kode: {
				type: Number,
				required: true,
			},
      pekerjaan_nama: {
				type: String,
				required: true,
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('pekerjaan', schema);
  return Table
}