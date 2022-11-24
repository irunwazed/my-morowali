import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nik: {
				type: String
			},
      penduduk_id: {type: Schema.Types.ObjectId, ref: 'penduduks', required: true},
			tahun: {type: Number, required: true},
			bantuan: {
				bantuan_id: {type: Schema.Types.ObjectId, ref: 'bantuans'},
				pagu: {type: Number},
				keterangan: {type: String},
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('penduduk_bantuan', schema);
  return Table
}