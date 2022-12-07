const mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      kode: {
				type: String,
				required: true,
        unique: true,
			},
      nama: {
				type: String,
				required: true,
        unique: true,
			},
      pimpinan: {
				nama: String,
				nip: String,
			},
      keterangan: {
				type: String,
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('opd', schema);
  return Table
}