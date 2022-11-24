import db from '../app/models';
import bcrypt from 'bcrypt';

const running = async () => {

  await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  await db.penyakit.deleteMany({})
  await db.penyakit.insertMany([
    {nama: 'Lainnya'},
    {nama: 'Tidak Ada'},
    {nama: 'Hipertensi'},
    {nama: 'Rematik'},
    {nama: 'Asma'},
    {nama: 'Masalah Jantung'},
    {nama: 'Diabetes'},
    {nama: 'Tuberculosis'},
    {nama: 'Stroke'},
    {nama: 'Kanker /tumor'},
  ]);
  console.log('insert data penyakit');

  await db.pekerjaan.deleteMany({})
  await db.pekerjaan.insertMany([
    {nama: 'Lainnya'},
    {nama: 'Tidak Ada'},
    {nama: 'Petani'},
    {nama: 'Nelayan'},
    {nama: 'Buru'},
    {nama: 'Pedagang'},
    {nama: 'Tukang'},
    {nama: 'Pemerintah Desa'},
    {nama: 'Pelajar / Mahasiswa'},
    {nama: 'Petani Rumput Laut'},
    {nama: 'Pengurus Rumah Tangga'},
    {nama: 'Karyawan'},
  ]);
  console.log('insert data pekerjaan');
	
}

running();