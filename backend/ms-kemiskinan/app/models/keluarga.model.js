const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      no_kk: {
				type: String,
				required: true,
        unique: true,
			},
      kb: {
				type: Number,
				comment: '1. Ya, 2. Tidak',
			},
      nik_kepala: {
				type: String,
				comment: 'NIK kepala keluarga',
			},
      kk_image: {
				type: String,
      }
    },
    { timestamps: true }
  );

  schema.virtual('kepala_keluarga',{
    ref: 'penduduk',
    localField: 'nik_kepala',
    foreignField: 'nik',
    justOne: true
  });

  const Table = mongoose.model('keluarga', schema);
  return Table
}