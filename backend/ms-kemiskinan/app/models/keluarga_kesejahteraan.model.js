const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      no_kk: {
				type: String,
			},
      keluarga_id: {type: Schema.Types.ObjectId, ref: 'keluarga', required: true},
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
					rumah_id: {type: Schema.Types.ObjectId, ref: 'ki_rumah', required: true},
					nama: String,
					ukuran: Number,
					image: String,
					keterangan: String,
				},
				atap: {
					atap_id: {type: Schema.Types.ObjectId, ref: 'ki_atap', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				bahan_bakar: {
					bahan_bakar_id: {type: Schema.Types.ObjectId, ref: 'ki_bahan_bakar', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				dinding: {
					dinding_id: {type: Schema.Types.ObjectId, ref: 'ki_dinding', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				jamban: {
					jamban_id: {type: Schema.Types.ObjectId, ref: 'ki_jamban', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				lantai: {
					lantai_id: {type: Schema.Types.ObjectId, ref: 'ki_lantai', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				penerangan: {
					penerangan_id: {type: Schema.Types.ObjectId, ref: 'ki_penerangan', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				sumber_air: {
					sumber_air_id: {type: Schema.Types.ObjectId, ref: 'ki_sumber_air', required: true},
					nama: String,
					image: String,
					keterangan: String,
				},
				simpanan: {
					type: Boolean,
					comment: 'Memiliki Simpanan Uang/Perhiasan/Ternak/Lainnya',
					default: false,
				},
			},
    },
    { timestamps: true }
  );

	schema.virtual('kepala_keluarga',{
    ref: 'penduduk',
    localField: 'keluarga_id.nik_kepala',
    foreignField: 'nik',
    justOne: true
  });

  const Table = mongoose.model('keluarga_kesejahteraan', schema);
  return Table
}