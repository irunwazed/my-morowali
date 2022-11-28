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
				comment: '1. Sejahtera, 2 Hampir Miskin, 3. Miskin, 4. Sangat Miskin, 5. Belum Ada'
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
					ukuran: Number,
					image: String,
					keterangan: String,
				},
				atap: {
					atap_id: {type: Schema.Types.ObjectId, ref: 'ki_ataps', required: true},
					image: String,
					keterangan: String,
				},
				bahan_bakar: {
					bahan_bakar_id: {type: Schema.Types.ObjectId, ref: 'ki_bahan_bakars', required: true},
					image: String,
					keterangan: String,
				},
				dinding: {
					dinding_id: {type: Schema.Types.ObjectId, ref: 'ki_dindings', required: true},
					image: String,
					keterangan: String,
				},
				jamban: {
					jamban_id: {type: Schema.Types.ObjectId, ref: 'ki_jambans', required: true},
					image: String,
					keterangan: String,
				},
				lantai: {
					lantai_id: {type: Schema.Types.ObjectId, ref: 'ki_lantais', required: true},
					image: String,
					keterangan: String,
				},
				penerangan: {
					penerangan_id: {type: Schema.Types.ObjectId, ref: 'ki_penerangans', required: true},
					image: String,
					keterangan: String,
				},
				sumber_air: {
					sumber_air_id: {type: Schema.Types.ObjectId, ref: 'ki_sumber_airs', required: true},
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