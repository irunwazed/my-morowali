const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      nip: {
				type: String,
				required: true,
        unique: true,
			},
      nik: {
				type: String,
			},
      login_id: {type: Schema.Types.ObjectId, ref: 'logins', unique: true},
      posisi: [
				{
					opd_nama: String,
					opd_kode: String,
					jabatan_nama: String,
					jabatan_level: Number, // 1 kepala, 2 sekretaris, 3 kabid, 4 kasubag, 5 kasubid, 6 fungsional, 7 staff
				},
			],
    },
    { timestamps: true }
  );

  const Table = mongoose.model('pegawai', schema);

  return Table
}