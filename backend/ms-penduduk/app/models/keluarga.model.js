import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      no_kk: {
				type: String,
				required: true,
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('keluarga', schema);
  return Table
}