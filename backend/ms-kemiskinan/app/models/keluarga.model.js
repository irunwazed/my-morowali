import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      no_kk: {
				type: String,
				required: true,
			},
      kb: {
				type: String,
				comment: '1. Ya, 2. Tidak',
			},
      nik_kepala: {
				type: String,
				comment: 'NIK kepala keluarga',
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('keluarga', schema);
  return Table
}