const mongoose = require("mongoose");

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: {
				type: String,
				required: true,
			},
      username: {
				type: String,
				required: true,
        unique: true,
			},
      level: {
				type: Number,
				required: true,
				comment: '1. Super Admin, 2. Admin, 3. Admin lainnya, 4. Pegawai, 5. Penduduk'
			},
      level_akun: {
				type: Number,
				comment: 'get from table other admin'
			},
      password: {
				type: String,
				required: true,
			},
      status: {
				type: Number, 
				required: true,
				comment: '1. Aktif, 2 Non Aktif, 3 Tunggu Verifikasi'
			},
    },
    { timestamps: true }
  );
	
  const Table = mongoose.model('login', schema);

  return Table
}