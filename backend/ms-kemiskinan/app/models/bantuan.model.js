const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      opd: {
				kode: {type: String},
				nama: {type: String},
			},
      jenis: {
        type: Number,
        comment: '1. Lainnya, 2. BPNT, 3. BPUM, 4. BST, 5. PKH, 6. PBI JKN, 7. BPNT-PPKM, 8. SEMBAKO',
      },
      keterangan: {
				type: String,
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('bantuan', schema);
  return Table
}