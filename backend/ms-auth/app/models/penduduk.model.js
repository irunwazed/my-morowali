import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      nik: {
				type: String,
				required: true,
			},
      login_id: {type: Schema.Types.ObjectId, ref: 'logins', unique: true},
			alamat : {
				kabupaten_kode: String,
				kecamatan_kode: String,
				kelurahan_kode: String,
				kabupaten_nama: String,
				kecamatan_nama: String,
				kelurahan_nama: String,
				alamat_nama: String,
			}
    },
    { timestamps: true }
  );

  const Table = mongoose.model('penduduk', schema);

  return Table
}