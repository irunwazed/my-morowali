const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nik: {
				type: String
			},
      penduduk_id: {type: Schema.Types.ObjectId, ref: 'penduduks', required: true},
      pekerjaan_id: {type: Schema.Types.ObjectId, ref: 'pekerjaans', required: true},
      gaji: {
        type: Number,
        required: true
      },
      keterangan: String,
    },
    { timestamps: true }
  );

  const Table = mongoose.model('penduduk_pekerjaan', schema);
  return Table
}