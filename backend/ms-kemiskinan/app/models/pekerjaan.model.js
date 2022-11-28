import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
        unique: true,
			},
      keterangan: {
				type: String
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('pekerjaan', schema);
  return Table
}