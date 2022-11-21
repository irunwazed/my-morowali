import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      no_kk: {
				type: String,
				required: true,
			},
      keluarga_id: {type: Schema.Types.ObjectId, ref: 'keluargas', required: true},
      status_kesejahteraan: {
				type: Number,
				required: true,
				comment: '1. Sejahtera, 2 Hampir Sejahtera, 3. Tidak Sejahtera, 4. Jauh dari sejahtera'
			},
			tahun: {type: Number, required: true},
			kondisi: {
				rumah: {
					type: Number, 
					required: true,
					comment: '1. Milik Sendiri, 2 Sewa/Kos, 3 Tidak ada'
				},
				jamban: {
					type: Number, 
					required: true,
					comment: '1. Milik Sendiri, 2 Umumn, 3 Tidak ada'
				},
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('keluarga_kesejahteraan', schema);
  return Table
}