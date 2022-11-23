import mongoose from "mongoose";
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      nik: {
				type: String,
				required: true,
			},
			jk: { 
				type: String,
				required: true,
				comment: 'L. Laki - Laki, P Perempuan' 
			},
			agama: { 
				type: Number,
				comment: '1. Islam, 2. Kristen, 3. Khatolik, 4. Hindu, 5 Buddha, 6. Konghucu'
			},
			lahir: { 
				tempat: String,
				tanggal: Date,
			},
			alamat : {
				kabupaten_kode: String,
				kecamatan_kode: String,
				kelurahan_kode: String,
				kabupaten_nama: String,
				kecamatan_nama: String,
				kelurahan_nama: String,
				alamat_nama: String,
				longitude: Number,
				latitude: Number,
			},
			status_pernikahan: { 
				type: Number,
				comment: '1. Lajang, 2. Menikah, 3 Cerai, 4. Cerai Mati, 5. Duda, 6. Janda'
			},
			fisik: {
				fisik_id: {type: Schema.Types.ObjectId, ref: 'fisiks'},
				keterangan: String,
			},
			pendidikan_id: {type: Schema.Types.ObjectId, ref: 'pendidikans'},
			penyakit: {
				penyakit_id: {type: Schema.Types.ObjectId, ref: 'penyakits'}, 
				keterangan: String
			}
    },
    { timestamps: true }
  );

  const Table = mongoose.model('penduduk', schema);
  return Table
}