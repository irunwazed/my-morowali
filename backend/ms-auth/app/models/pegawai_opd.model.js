import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      opd_id: [
				{type: Schema.Types.ObjectId, ref: 'opds'}
			],
      pegawai:{
        pegawai_id : {type: Schema.Types.ObjectId, ref: 'pegawais'},
        jabatan: {
          level: { type: Number, required: true }, // 1 Pimpinan, 2 Sekretaris, 3 Kabid, 4 Kasubag Program, 5 Kasubag Kepegawaian, 6 Bendahara, 7 Kasubid, 8 Staff
          nama: String, // contoh kabid monev
          status: { type: Number, required: true }, // 1 tetap, 2 PLH
        }
      }
    },
    { timestamps: true }
  );

  const Pegawai = mongoose.model('pegawai_opd', schema);
  return Pegawai
}