import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      asal: {
				opd_kode: String,
				opd_nama: String,
			},
      keterangan: {
				type: String,
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('pendidikan', schema);
  return Table
}