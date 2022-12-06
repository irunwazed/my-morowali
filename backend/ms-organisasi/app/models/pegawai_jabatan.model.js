const mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nip: {
				type: String,
				required: true,
			},
      pegawai_id: {type: Schema.Types.ObjectId, ref: 'pegawais', required: true},
      jabatan: {
        opd_id: {type: Schema.Types.ObjectId, ref: 'opds', required: true},
        jabatan_nama: { type: String, comment: 'Nama Jabatan', required: true },
        jabatan_level: { 
          type: Number, 
          comment: '1 kepala, 2 sekretaris, 3 kabid, 4 kasubag, 5 kasubid, 6 fungsional, 7 staff', 
          required: true
        },
        required: true,
			},
      jabatan_lainnya:[
        {
          opd_id: {type: Schema.Types.ObjectId, ref: 'opds', required: true},
          jabatan_nama: { type: String, comment: 'Nama Jabatan', required: true },
          jabatan_level: { 
            type: Number, 
            comment: '1 kepala, 2 sekretaris, 3 kabid, 4 kasubag, 5 kasubid, 6 fungsional, 7 staff', 
            required: true
          },
        }
      ]
    },
    { timestamps: true }
  );

  const Table = mongoose.model('pegawai_jabatan', schema);
  return Table
}