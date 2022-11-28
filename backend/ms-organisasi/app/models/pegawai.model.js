import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nip: {
				type: String,
				required: true,
        unique: true,
			},
      nama: {
				type: String,
				required: true,
			},
      golongan: { type: String },
      esolon: { type: String },
      keterangan: {
				type: String,
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('pegawai', schema);
  return Table
}