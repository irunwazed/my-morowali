const db = require('../app/models');

const running = async () => {

  await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  await db.opd.deleteMany({})
  await db.opd.insertMany([
    {kode: '1.01.2.22.0.00.01.0000',nama: 'Dinas Pendidikan dan Kebudayaan.'},
    {kode: '1.02.0.00.0.00.01.0001',nama: 'Rumah Sakit Umum Daerah Morowali'},
    {kode: '1.02.0.00.0.00.02.0002',nama: 'Rumah Sakit Pratama'},
    {kode: '1.02.2.14.0.00.01.0000',nama: 'Dinas Kesehatan, Pengendalian Penduduk dan Keluarga Berencana'},
    {kode: '1.02.2.14.0.00.01.0001',nama: 'Puskesmas Ulunambo'},
    {kode: '1.02.2.14.0.00.01.0002',nama: 'Puskesmas Kaleroang'},
    {kode: '1.02.2.14.0.00.01.0003',nama: 'Puskesmas Lafeu'},
    {kode: '1.02.2.14.0.00.01.0004',nama: 'Puskesmas Bahodopi'},
    {kode: '1.02.2.14.0.00.01.0005',nama: 'Puskesmas Bahomotefe'},
    {kode: '1.02.2.14.0.00.01.0006',nama: 'Puskesmas Bungku'},
    {kode: '1.02.2.14.0.00.01.0007',nama: 'Puskesmas Wosu'},
    {kode: '1.02.2.14.0.00.01.0008',nama: 'Puskesmas Bahonsuai'},
    {kode: '1.02.2.14.0.00.01.0009',nama: 'Puskesmas Laantula Jaya'},
    {kode: '1.02.2.14.0.00.01.0010',nama: 'Puskesmas Tanjung Harapan'},
    {kode: '1.02.2.14.0.00.01.0011',nama: 'Puskesmas Fonuasingko'},
    {kode: '1.03.0.00.0.00.01.0000',nama: 'Dinas Pekerjaan Umum dan Penataan Ruang'},
    {kode: '1.04.2.10.0.00.01.0000',nama: 'Dinas Perumahan, Kawasan Pemukiman dan Pertanahan'},
    {kode: '1.05.0.00.0.00.01.0000',nama: 'Badan Penanggulangan Bencana Daerah'},
    {kode: '1.05.0.00.0.00.02.0000',nama: 'Satuan Polisi Pamongpraja'},
    {kode: '1.06.0.00.0.00.01.0000',nama: 'Dinas Sosial'},
    {kode: '2.07.3.32.0.00.01.0000',nama: 'Dinas Transmigrasi Dan Tenaga Kerja Daerah'},
    {kode: '2.09.3.27.0.00.01.0000',nama: 'Dinas Pertanian Dan Ketahanan Pangan'},
    {kode: '2.11.0.00.0.00.01.0000',nama: 'Dinas Lingkungan Hidup Daerah'},
    {kode: '2.12.0.00.0.00.01.0000',nama: 'Dinas Kependudukan dan Pencatatan Sipil Daerah'},
    {kode: '2.13.2.08.0.00.01.0000',nama: 'Dinas Pemberdayaan Masyarakat, Desa,Pemberdayaan Perempuan dan Perlindungan Anak'},
    {kode: '2.15.0.00.0.00.01.0000',nama: 'Dinas Perhubungan Daerah'},
    {kode: '2.16.0.00.0.00.01.0000',nama: 'Dinas Komunikasi dan Informatika'},
    {kode: '2.17.0.00.0.00.01.0000',nama: 'Dinas Koperasi, Usaha Kecil, dan Menengah'},
    {kode: '2.18.0.00.0.00.01.0000',nama: 'Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu'},
    {kode: '2.19.3.26.0.00.01.0000',nama: 'Dinas Kepemudaan, Olahraga dan Pariwisata'},
    {kode: '2.23.2.24.0.00.01.0000',nama: 'Dinas Perpustakaan Daerah'},
    {kode: '3.25.0.00.0.00.01.0000',nama: 'Dinas Perikanan Daerah'},
    {kode: '3.30.3.31.0.00.01.0000',nama: 'Dinas Perdagangan Dan Perindustrian'},
    {kode: '4.01.0.00.0.00.01.0000',nama: 'SEKRETARIAT DAERAH'},
    {kode: '4.01.0.00.0.00.01.0001',nama: 'Bagian Administrasi Pembangunan'},
    {kode: '4.01.0.00.0.00.01.0002',nama: 'Bagian Ekonomi dan Sumber Daya Alam'},
    {kode: '4.01.0.00.0.00.01.0003',nama: 'Bagian Hukum'},
    {kode: '4.01.0.00.0.00.01.0004',nama: 'Bagian Kesejahteraan Rakyat'},
    {kode: '4.01.0.00.0.00.01.0005',nama: 'Bagian Organisasi'},
    {kode: '4.01.0.00.0.00.01.0006',nama: 'Bagian Pemerintahan'},
    {kode: '4.01.0.00.0.00.01.0007',nama: 'Bagian Pengadaan Barang dan Jasa'},
    {kode: '4.01.0.00.0.00.01.0008',nama: 'Bagian Protokoler dan Komunikasi Pimpinan'},
    {kode: '4.01.0.00.0.00.01.0009',nama: 'Bagian Umum'},
    {kode: '4.02.0.00.0.00.01.0000',nama: 'Sekretariat Dewan Perwakilan Rakyat Daerah'},
    {kode: '5.01.5.05.0.00.01.0000',nama: 'Badan Perencanaan, Penelitian, dan Pengembangan Daerah'},
    {kode: '5.02.0.00.0.00.01.0000',nama: 'Badan Pengelola Keuangan dan Aset Daerah'},
    {kode: '5.02.0.00.0.00.02.0000',nama: 'Badan Pengelola Pendapatan Daerah'},
    {kode: '5.03.5.04.0.00.01.0000',nama: 'Badan Kepegawaian Daerah dan Pengembangan Sumber Daya Manusia'},
    {kode: '6.01.0.00.0.00.01.0000',nama: 'Inspektorat Daerah'},
    {kode: '7.01.0.00.0.00.01.0000',nama: 'Kecamatan Bahodopi'},
    {kode: '7.01.0.00.0.00.02.0000',nama: 'Kecamatan Bumi Raya'},
    {kode: '7.01.0.00.0.00.03.0000',nama: 'Kecamatan Bungku Barat'},
    {kode: '7.01.0.00.0.00.04.0000',nama: 'Kecamatan Bungku Pesisir'},
    {kode: '7.01.0.00.0.00.05.0000',nama: 'Kecamatan Bungku Selatan'},
    {kode: '7.01.0.00.0.00.06.0000',nama: 'Kecamatan Bungku Tengah'},
    {kode: '7.01.0.00.0.00.06.0001',nama: 'Kelurahan Bungi'},
    {kode: '7.01.0.00.0.00.06.0002',nama: 'Kelurahan Lamberea'},
    {kode: '7.01.0.00.0.00.06.0003',nama: 'Kelurahan Matano'},
    {kode: '7.01.0.00.0.00.06.0004',nama: 'Kelurahan Marsaole'},
    {kode: '7.01.0.00.0.00.06.0005',nama: 'Kelurahan Tofoiso'},
    {kode: '7.01.0.00.0.00.06.0006',nama: 'Kelurahan Mendui'},
    {kode: '7.01.0.00.0.00.07.0000',nama: 'Kecamatan Bungku Timur'},
    {kode: '7.01.0.00.0.00.08.0000',nama: 'Kecamatan Menui Kepulauan'},
    {kode: '7.01.0.00.0.00.08.0007',nama: 'Kelurahan Ulunambo'},
    {kode: '7.01.0.00.0.00.09.0000',nama: 'Kecamatan Wita Ponda'},
    {kode: '8.01.0.00.0.00.01.0000',nama: 'Badan Kesatuan Bangsa dan Politik Daerah'},
  ]);
  console.log('insert data OPD');

  // 
  setInterval(() => {
    console.log("stop");
    process.exit();
  }, 5000);
}

running();