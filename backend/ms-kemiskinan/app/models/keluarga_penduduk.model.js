const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      keluarga_id: {type: Schema.Types.ObjectId, ref: 'keluargas', required: true},
      penduduk_id: {type: Schema.Types.ObjectId, ref: 'penduduks', required: true},
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

  const Table = mongoose.model('keluarga_penduduk', schema);
  return Table
}