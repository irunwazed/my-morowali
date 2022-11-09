import db from '../app/models';
import bcrypt from 'bcrypt';

const running = async () => {

  await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  await db.users.deleteMany({})
  await db.users.insertMany([
    { username: 'super-admin', level: 1, password: bcrypt.hashSync('123456', 10) },
    { username: 'admin', level: 1, password: bcrypt.hashSync('123456', 10) },
    { username: 'pendidikan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'rsud', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'rs-pratama', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'dinkes', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_ulunambo', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_kaleroang', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_lafeu', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_bahodopi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_bahomotefe', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_bungku', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_wosu', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_bahonsuai', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_jaya', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_harapan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas_fonuasingko', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'pu', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'perumahan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bencana', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'polpp', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'sosial', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'transmigrasi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'pertanian', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'dlhd', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'capil', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'pemdes', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'perhubungan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kominfo', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'koperasi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'ptsp', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'dispora', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'puskesmas', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'perikanan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'perindag', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'sekretariat_daerah', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_administrasi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_ekonomi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_hukum', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_kesejahteraan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_organisasi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_pemerintahan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_pengadaan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_protokoler', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bagian_umum', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'sekretariat_dewan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bappeda', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bpkad', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'pendapatan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'bkd', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'inspektorat', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_bahodopi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_bumi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_bungku_barat', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_bungku_pesisir', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_bungku_selatan', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_bungku_tengah', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kelurahan_bungi', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kelurahan_lamberea', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kelurahan_matano', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kelurahan_marsaole', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kelurahan_tofoiso', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kelurahan_mendui', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_bungku', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_menui', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kelurahan_ulunambo', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kecamatan_wita', level: 3, password: bcrypt.hashSync('123456', 10) },
    { username: 'kesbang', level: 3, password: bcrypt.hashSync('123456', 10) },
  ]);
  console.log('insert data user');

  await db.opd.deleteMany({})
  await db.opd.insertMany([
    { kode: '1.1', opd_nama: 'Dinas Pendidikan dan Kebudayaan' },
    { kode: '2.2', opd_nama: 'Rumah Sakit Umum Daerah Morowali' },
    { kode: '2.3', opd_nama: 'Rumah Sakit Pratama' },
    { kode: '2.1', opd_nama: 'Dinas Kesehatan, Pengendalian Penduduk dan Keluarga Berencana' },
    { kode: '2.4', opd_nama: 'Puskesmas Ulunambo' },
    { kode: '2.5', opd_nama: 'Puskesmas Kaleroang' },
    { kode: '2.6', opd_nama: 'Puskesmas Lafeu' },
    { kode: '2.7', opd_nama: 'Puskesmas Bahodopi' },
    { kode: '2.8', opd_nama: 'Puskesmas Bahomotefe' },
    { kode: '2.9', opd_nama: 'Puskesmas Bungku' },
    { kode: '2.10', opd_nama: 'Puskesmas Wosu' },
    { kode: '2.11', opd_nama: 'Puskesmas Bahonsuai' },
    { kode: '2.12', opd_nama: 'Puskesmas Laantula Jaya' },
    { kode: '2.13', opd_nama: 'Puskesmas Tanjung Harapan' },
    { kode: '2.14', opd_nama: 'Puskesmas Fonuasingko' },
    { kode: '3.1', opd_nama: 'Dinas Pekerjaan Umum dan Penataan Ruang' },
    { kode: '4.1', opd_nama: 'Dinas Perumahan, Kawasan Pemukiman dan Pertanahan' },
    { kode: '5.1', opd_nama: 'Badan Penanggulangan Bencana Daerah' },
    { kode: '6.1', opd_nama: 'Satuan Polisi Pamongpraja' },
    { kode: '7.1', opd_nama: 'Dinas Sosial' },
    { kode: '8.1', opd_nama: 'Dinas Transmigrasi Dan Tenaga Kerja Daerah' },
    { kode: '9.1', opd_nama: 'Dinas Pertanian Dan Ketahanan Pangan' },
    { kode: '10.1', opd_nama: 'Dinas Lingkungan Hidup Daerah' },
    { kode: '11.1', opd_nama: 'Dinas Kependudukan dan Pencatatan Sipil Daerah' },
    { kode: '12.1', opd_nama: 'Dinas Pemberdayaan Masyarakat, Desa,Pemberdayaan Perempuan dan Perlindungan Anak' },
    { kode: '13.1', opd_nama: 'Dinas Perhubungan Daerah' },
    { kode: '14.1', opd_nama: 'Dinas Komunikasi dan Informatika' },
    { kode: '15.1', opd_nama: 'Dinas Koperasi, Usaha Kecil, dan Menengah' },
    { kode: '16.1', opd_nama: 'Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu' },
    { kode: '17.1', opd_nama: 'Dinas Kepemudaan, Olahraga dan Pariwisata' },
    { kode: '18.1', opd_nama: 'Dinas Perpustakaan Daerah' },
    { kode: '19.1', opd_nama: 'Dinas Perikanan Daerah' },
    { kode: '20.1', opd_nama: 'Dinas Perdagangan Dan Perindustrian' },
    { kode: '21.1', opd_nama: 'SEKRETARIAT DAERAH' },
    { kode: '21.2', opd_nama: 'Bagian Administrasi Pembangunan' },
    { kode: '21.3', opd_nama: 'Bagian Ekonomi dan Sumber Daya Alam' },
    { kode: '21.4', opd_nama: 'Bagian Hukum' },
    { kode: '21.5', opd_nama: 'Bagian Kesejahteraan Rakyat' },
    { kode: '21.6', opd_nama: 'Bagian Organisasi' },
    { kode: '21.7', opd_nama: 'Bagian Pemerintahan' },
    { kode: '21.8', opd_nama: 'Bagian Pengadaan Barang dan Jasa' },
    { kode: '21.9', opd_nama: 'Bagian Protokoler dan Komunikasi Pimpinan' },
    { kode: '21.10', opd_nama: 'Bagian Umum' },
    { kode: '22.1', opd_nama: 'Sekretariat Dewan Perwakilan Rakyat Daerah' },
    { kode: '23.1', opd_nama: 'Badan Perencanaan, Penelitian, dan Pengembangan Daerah' },
    { kode: '24.1', opd_nama: 'Badan Pengelola Keuangan dan Aset Daerah' },
    { kode: '25.1', opd_nama: 'Badan Pengelola Pendapatan Daerah' },
    { kode: '26.1', opd_nama: 'Badan Kepegawaian Daerah dan Pengembangan Sumber Daya Manusia' },
    { kode: '27.1', opd_nama: 'Inspektorat Daerah' },
    { kode: '28.1', opd_nama: 'Kecamatan Bahodopi' },
    { kode: '29.1', opd_nama: 'Kecamatan Bumi Raya' },
    { kode: '30.1', opd_nama: 'Kecamatan Bungku Barat' },
    { kode: '31.1', opd_nama: 'Kecamatan Bungku Pesisir' },
    { kode: '32.1', opd_nama: 'Kecamatan Bungku Selatan' },
    { kode: '33.1', opd_nama: 'Kecamatan Bungku Tengah' },
    { kode: '33.2', opd_nama: 'Kelurahan Bungi' },
    { kode: '33.3', opd_nama: 'Kelurahan Lamberea' },
    { kode: '33.4', opd_nama: 'Kelurahan Matano' },
    { kode: '33.5', opd_nama: 'Kelurahan Marsaole' },
    { kode: '33.6', opd_nama: 'Kelurahan Tofoiso' },
    { kode: '33.7', opd_nama: 'Kelurahan Mendui' },
    { kode: '34.1', opd_nama: 'Kecamatan Bungku Timur' },
    { kode: '35.1', opd_nama: 'Kecamatan Menui Kepulauan' },
    { kode: '35.2', opd_nama: 'Kelurahan Ulunambo' },
    { kode: '36.1', opd_nama: 'Kecamatan Wita Ponda' },
    { kode: '37.1', opd_nama: 'Badan Kesatuan Bangsa dan Politik Daerah' },
  ]);
  console.log('insert data opd');

  let users = await db.users.find({level: 3});
  let dataPegawai = [];
  users.forEach( (element) => {
    dataPegawai.push({
      nama: 'pimpinan-opd',
      login_id: element._id,
    })
  });
  await db.pegawai.deleteMany({})
  await db.pegawai.insertMany(dataPegawai);
  console.log('insert data pegawai');

  let pegawai = await db.pegawai.find({});
  let opd = await db.opd.find({});
  let dataOpdPegawai = [];
  for(let i = 0; i < opd.length; i++){
    dataOpdPegawai.push({
      opd_id: opd[i]._id,
      pegawai: {
        pegawai_id: pegawai[i]._id,
        jabatan: {
          level: 1,
          nama: '-',
          status: 1,
        }
      }
    })
  }
  await db.pegawai_opd.deleteMany({})
  await db.pegawai_opd.insertMany(dataOpdPegawai);
  console.log('insert data pegawai opd');

}

running()