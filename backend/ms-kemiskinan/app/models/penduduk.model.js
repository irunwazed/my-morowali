const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose => {
  const schema = new mongoose.Schema(
    {
      nama: {
				type: String,
				required: true,
			},
      nik: {
				type: String,
				required: true,
        unique: true,
			},
			jk: { 
				type: String,
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
				provinsi_kode: String,
				kabupaten_kode: String,
				kecamatan_kode: String,
				kelurahan_kode: String,
				provinsi_nama: String,
				kabupaten_nama: String,
				kecamatan_nama: String,
				kelurahan_nama: String,
				alamat_nama: String,
				rt: String,
				rw: String,
				dusun: String,
				longitude: Number,
				latitude: Number,
			},
			status_pernikahan: { 
				type: Number,
				comment: '1. Belum Menikah, 2. Menikah, 3 Cerai, 4. Duda, 5. Janda'
			},
			fisik: {
				fisik_id: {type: Number, comment: '1. Lainnya, 2. Sehat, 3. Cacat'},
				keterangan: String,
			},
			pendidikan_id: {type: Number, comment: '1. Tidak/belum sekolah 2. Tidak tamat SD/sederajat, 3. Siswa SD/sederajat, 4. Tamat SD/sederajat, 5. Siswa SMP/sederajat, 6. Tamat SMP/sederajat, 7. Siswa SMA/sederajat, 8. Tamat SMA/sederajat, 9. Mahasiswa Perguruan Tinggi, 10. Tamat Perguruan Tinggi'},
			penyakit: {
				penyakit_id: {type: Schema.Types.ObjectId, ref: 'penyakits'}, 
				keterangan: String
			},
			hidup:{ 
				type: Boolean,
				comment: 'true = Hidup, false = Mati' 
			},
			data: {
				type: Object,
				comment: 'other data'
			}
    },
    { timestamps: true }
  );

  const Table = mongoose.model('penduduk', schema);
  return Table
}