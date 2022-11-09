import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      login_id: {type: Schema.Types.ObjectId, ref: 'logins', unique: true},
    },
    { timestamps: true }
  );

  const Pegawai = mongoose.model('pegawai', schema);

  return Pegawai
}