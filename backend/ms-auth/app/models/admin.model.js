const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = Schema(
    {
      nama: {
				type: String, // admin desa, admin dll
				required: true,
			},
			level: {
				type: Number,
				required: true,
        unique: true,
			},
      data: {
        type: Object,
        default: []
      },
      keterangan: {
				type: String, 
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('admin', schema);
  return Table
}