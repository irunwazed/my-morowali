import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String, // admin desa, admin dll
				required: true,
			},
			level: {
				type: Number,
				required: true,
			},
      login_id: {type: Schema.Types.ObjectId, ref: 'logins', unique: true},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('admin', schema);
  return Table
}