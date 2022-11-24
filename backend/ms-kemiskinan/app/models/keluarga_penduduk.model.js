import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      no_kk: {
				type: String,
				required: true,
			},
      keluarga_id: {type: Schema.Types.ObjectId, ref: 'keluargas', required: true},
      level: {
				type: Number,
				required: true,
				comment: '1. Istri / Suami, 2 Anak, 3 Wali, 4 Lainnya'
			},
			kepala: {
				type: Boolean,
				default: false,
				comment: 'true => kepala keluarga'
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('penduduk_keluarga', schema);
  return Table
}