import mongoose from "mongoose";

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      kode: String,
      opd_nama: {
				type: String,
				required: true,
			},
      pimpinan: {
        nama: String,
        nip: String,
      }
    },
    { timestamps: true }
  );

  const Opd = mongoose.model('opd', schema);

  return Opd
}