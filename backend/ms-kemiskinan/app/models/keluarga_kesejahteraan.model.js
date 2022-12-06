const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      no_kk: {
				type: String,
			},
      keluarga_id: {type: Schema.Types.ObjectId, ref: 'keluargas', required: true},
      status_kesejahteraan: {
				type: Number,
				required: true,
				comment: '1. Sangat Miskin, 2. Miskin, 3. Rentan Miskin, 4. Menuju Miskin, 5. Middle Class'
			},
			tahun: {type: Number, required: true},
			keuangan: {
				pendapatan_utama: Number,
				pendapatan_sampingan: Number,
				pengeluaran_total: Number,
			},
			indikator: {
				rumah: {
					rumah_id: {type: Schema.Types.ObjectId, ref: 'ki_rumahs', required: true},
					nama: String,
					ukuran: Number,
					image: String,
					keterangan: String,
				},
				atap: {
					atap_id: {type: Schema.Types.ObjectId, ref: 'ki_ataps', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				bahan_bakar: {
					bahan_bakar_id: {type: Schema.Types.ObjectId, ref: 'ki_bahan_bakars', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				dinding: {
					dinding_id: {type: Schema.Types.ObjectId, ref: 'ki_dindings', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				jamban: {
					jamban_id: {type: Schema.Types.ObjectId, ref: 'ki_jambans', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				lantai: {
					lantai_id: {type: Schema.Types.ObjectId, ref: 'ki_lantais', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				penerangan: {
					penerangan_id: {type: Schema.Types.ObjectId, ref: 'ki_penerangans', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				sumber_air: {
					sumber_air_id: {type: Schema.Types.ObjectId, ref: 'ki_sumber_airs', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
			},
    },
    { timestamps: true }
  );

  const Table = mongoose.model('keluarga_kesejahteraan', schema);
  return Table
}