import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
			tahun: {type: Number, required: true},
			bantuan: {
				bantuan_id: {type: Schema.Types.ObjectId, ref: 'bantuans'},
				nama: String,
				pagu: {type: Number},
				keterangan: {type: String},
			},
      penduduk: [
        {
          penduduk_id: {type: Schema.Types.ObjectId, ref: 'penduduks', required: true},
          nik: String,
          nama: String,
        }
      ],
      lokasi : {
        level: Number, // 1 provinsi, 2 kabupaten, 3 kecamatan, 4. desa
        provinsi_kode: String,
        kabupaten_kode: String,
        kecamatan_kode: String,
        kelurahan_kode: String,
        provinsi_nama: String,
        kabupaten_nama: String,
        kecamatan_nama: String,
        kelurahan_nama: String,
        alamat_nama: String,
        longitude: Number,
        latitude: Number,
      },
    },
    { timestamps: true }
  );

  const Table = mongoose.model('penduduk_bantuan', schema);
  return Table
}