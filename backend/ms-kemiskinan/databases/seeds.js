import db from '../app/models';
import bcrypt from 'bcrypt';

const running = async () => {

  await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  
  await db.penduduk.deleteMany({})
  await db.keluarga.deleteMany({})
  await db.keluarga_penduduk.deleteMany({})
  
  await db.bantuan.deleteMany({})
  await db.penduduk_bantuan.deleteMany({})
  
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

  await db.ki_rumah.deleteMany({})
  await db.ki_rumah.insertMany([
    {nama: 'Lainnya', bobot: 0.1, keterangan: ''},
    {nama: 'Milik Sendiri', bobot: 0.8, keterangan: ''},
    {nama: 'Kontrak/Sewa', bobot: 0.6, keterangan: ''},
    {nama: 'Tidak Ada', bobot: 0.5, keterangan: ''},
  ]);
  console.log('insert data indikator rumah');

  await db.ki_atap.deleteMany({})
  await db.ki_atap.insertMany([
    {nama: 'Lainnya', bobot: 0.1, keterangan: ''},
    {nama: 'Beton', bobot: 1, keterangan: ''},
    {nama: 'Genteng', bobot: 0.9, keterangan: ''},
    {nama: 'Sirap', bobot: 0.9, keterangan: ''},
    {nama: 'Seng', bobot: 0.8, keterangan: ''},
    {nama: 'Asbes', bobot: 0.8, keterangan: ''},
    {nama: 'Ijuk/rumbia', bobot: 0.7, keterangan: ''},
  ]);
  console.log('insert data indikator atap');

  await db.ki_bahan_bakar.deleteMany({})
  await db.ki_bahan_bakar.insertMany([
    {nama: 'Lainnya', bobot: 0.1, keterangan: ''},
    {nama: 'Listrik/Gas/Elpiji', bobot: 1, keterangan: ''},
  ]);
  console.log('insert data indikator bahan bakar');

  await db.ki_dinding.deleteMany({})
  await db.ki_dinding.insertMany([
    {nama: 'Lainnya', bobot: 0.1, keterangan: ''},
    {nama: 'Tembok', bobot: 0.9, keterangan: ''},
    {nama: 'Kayu', bobot: 0.7, keterangan: ''},
    {nama: 'Bambu', bobot: 0.6, keterangan: ''},
    {nama: 'Papan', bobot: 0.7, keterangan: ''},
    {nama: 'Kalsiboard', bobot: 0.6, keterangan: ''},
  ]);
  console.log('insert data indikator dinding');

  await db.ki_jamban.deleteMany({})
  await db.ki_jamban.insertMany([
    {nama: 'Lainnya', bobot: 0.1, keterangan: ''},
    {nama: 'Sendiri', bobot: 0.8, keterangan: ''},
    {nama: 'Bersama/Umum', bobot: 0.5, keterangan: ''},
    {nama: 'Tidak Ada', bobot: 0.2, keterangan: ''},
  ]);
  console.log('insert data indikator jamban');

  await db.ki_lantai.deleteMany({})
  await db.ki_lantai.insertMany([
    {nama: 'Lainnya', bobot: 0.1, keterangan: ''},
    {nama: 'Tehel', bobot: 1, keterangan: ''},
    {nama: 'Semen', bobot: 0.8, keterangan: ''},
    {nama: 'Papan', bobot: 0.5, keterangan: ''},
    {nama: 'Bambu', bobot: 0.4, keterangan: ''},
    {nama: 'Tanah', bobot: 0.3, keterangan: ''},
  ]);
  console.log('insert data indikator lantai');

  await db.ki_penerangan.deleteMany({})
  await db.ki_penerangan.insertMany([
    {nama: 'Lainnya', bobot: 0.1, keterangan: ''},
    {nama: 'Listrik PLN', bobot: 1, keterangan: ''},
    {nama: 'Listrik Non PLN', bobot: 0.6, keterangan: ''},
    {nama: 'Tidak Ada Listrik', bobot: 0.2, keterangan: ''},
  ]);
  console.log('insert data indikator penerangan');

  await db.ki_sumber_air.deleteMany({})
  await db.ki_sumber_air.insertMany([
    {nama: 'Lainnya', bobot: 0.1, keterangan: ''},
    {nama: 'Air Kemasan', bobot: 1, keterangan: ''},
    {nama: 'Air Ledeng', bobot: 0.8, keterangan: ''},
    {nama: 'Air Terlindung', bobot: 0.6, keterangan: ''},
    {nama: 'Sumber Tidak Terlindungi', bobot: 0.3, keterangan: ''},
  ]);
  console.log('insert data indikator sumber air');

  
  await db.wil_provinsi.deleteMany({})
  await db.wil_provinsi.insertMany([
    { kode: '11', nama: 'Aceh' },
    { kode: '12', nama: 'Sumatera Utara' },
    { kode: '13', nama: 'Sumatera Barat' },
    { kode: '14', nama: 'Riau' },
    { kode: '15', nama: 'Jambi' },
    { kode: '16', nama: 'Sumatera Selatan' },
    { kode: '17', nama: 'Bengkulu' },
    { kode: '18', nama: 'Lampung' },
    { kode: '19', nama: 'Kep. Bangka Belitung' },
    { kode: '21', nama: 'Kep. Riau' },
    { kode: '31', nama: 'Dki Jakarta' },
    { kode: '32', nama: 'Jawa Barat' },
    { kode: '33', nama: 'Jawa Tengah' },
    { kode: '34', nama: 'Di Yogyakarta' },
    { kode: '35', nama: 'Jawa Timur' },
    { kode: '36', nama: 'Banten' },
    { kode: '51', nama: 'Bali' },
    { kode: '52', nama: 'Nusa Tenggara Barat' },
    { kode: '53', nama: 'Nusa Tenggara Timur' },
    { kode: '61', nama: 'Kalimantan Barat' },
    { kode: '62', nama: 'Kalimantan Tengah' },
    { kode: '63', nama: 'Kalimantan Selatan' },
    { kode: '64', nama: 'Kalimantan Timur' },
    { kode: '65', nama: 'Kalimantan Utara' },
    { kode: '71', nama: 'Sulawesi Utara' },
    { kode: '72', nama: 'Sulawesi Tengah' },
    { kode: '73', nama: 'Sulawesi Selatan' },
    { kode: '74', nama: 'Sulawesi Tenggara' },
    { kode: '75', nama: 'Gorontalo' },
    { kode: '76', nama: 'Sulawesi Barat' },
    { kode: '81', nama: 'Maluku' },
    { kode: '82', nama: 'Maluku Utara' },
    { kode: '91', nama: 'Papua Barat' },
    { kode: '94', nama: 'Papua' },
  ]);
  console.log('insert data provinsi');
  
  await db.wil_kabupaten.deleteMany({})
  await db.wil_kabupaten.insertMany([
    { kode: '7201', nama: 'Banggai Kepulauan', level: 2 },
    { kode: '7202', nama: 'Banggai', level: 2 },
    { kode: '7203', nama: 'Morowali', level: 2 },
    { kode: '7204', nama: 'Poso', level: 2 },
    { kode: '7205', nama: 'Donggala', level: 2 },
    { kode: '7206', nama: 'Toli-toli', level: 2 },
    { kode: '7207', nama: 'Buol', level: 2 },
    { kode: '7208', nama: 'Parigi Moutong', level: 2 },
    { kode: '7209', nama: 'Tojo Una-una', level: 2 },
    { kode: '7210', nama: 'Sigi', level: 2 },
    { kode: '7211', nama: 'Banggai Laut', level: 2 },
    { kode: '7212', nama: 'Morowali Utara', level: 2 },
    { kode: '7271', nama: 'Palu', level: 1 },
  ]);
  console.log('insert data kabupaten');
  
  await db.wil_kecamatan.deleteMany({})
  await db.wil_kecamatan.insertMany([
    { kode: '7203010', nama: 'Menui Kepulauan' },
    { kode: '7203020', nama: 'Bungku Selatan' },
    { kode: '7203021', nama: 'Bahodopi' },
    { kode: '7203022', nama: 'Bungku Pesisir' },
    { kode: '7203030', nama: 'Bungku Tengah' },
    { kode: '7203031', nama: 'Bungku Timur' },
    { kode: '7203040', nama: 'Bungku Barat' },
    { kode: '7203041', nama: 'Bumi Raya' },
    { kode: '7203042', nama: 'Wita Ponda' },
  ]);
  console.log('insert data kecamatan');
  
  await db.wil_desa.deleteMany({})
  await db.wil_desa.insertMany([
    { kode: '7203010001', nama: 'Padei Laut', level: 2 },
    { kode: '7203010002', nama: 'Ulunambo', level: 2 },
    { kode: '7203010003', nama: 'Kofalagadi', level: 2 },
    { kode: '7203010004', nama: 'Torukuno', level: 2 },
    { kode: '7203010005', nama: 'Terebino', level: 2 },
    { kode: '7203010006', nama: 'Ngapaea', level: 2 },
    { kode: '7203010007', nama: 'Morompaitonga', level: 2 },
    { kode: '7203010008', nama: 'Padalaa', level: 2 },
    { kode: '7203010009', nama: 'Padei Darat', level: 2 },
    { kode: '7203010010', nama: 'Masadian', level: 2 },
    { kode: '7203010011', nama: 'Samarengga', level: 2 },
    { kode: '7203010012', nama: 'Pulau Tiga', level: 2 },
    { kode: '7203010013', nama: 'Matano', level: 2 },
    { kode: '7203010014', nama: 'Matarape', level: 2 },
    { kode: '7203010015', nama: 'Buranga', level: 2 },
    { kode: '7203010016', nama: 'Ulunipa', level: 2 },
    { kode: '7203010017', nama: 'Wawongkolono', level: 2 },
    { kode: '7203010018', nama: 'Dongkalang', level: 2 },
    { kode: '7203010019', nama: 'Tanjung Harapan', level: 2 },
    { kode: '7203010020', nama: 'Tafagapi', level: 2 },
    { kode: '7203010021', nama: 'Pulau Tengah', level: 2 },
    { kode: '7203010022', nama: 'Tanjung Tiram', level: 2 },
    { kode: '7203010023', nama: 'Mbokitta', level: 2 },
    { kode: '7203010024', nama: 'Tanona', level: 2 },
    { kode: '7203020001', nama: 'Sainoa', level: 2 },
    { kode: '7203020002', nama: 'Polewali', level: 2 },
    { kode: '7203020003', nama: 'Pulau Dua', level: 2 },
    { kode: '7203020004', nama: 'Umbele', level: 2 },
    { kode: '7203020005', nama: 'Jawi Jawi', level: 2 },
    { kode: '7203020006', nama: 'Buton', level: 2 },
    { kode: '7203020007', nama: 'Koburu', level: 2 },
    { kode: '7203020008', nama: 'Bungingkela', level: 2 },
    { kode: '7203020009', nama: 'Lokombulo', level: 2 },
    { kode: '7203020010', nama: 'Paku', level: 2 },
    { kode: '7203020011', nama: 'Bakala', level: 2 },
    { kode: '7203020012', nama: 'Buajangka', level: 2 },
    { kode: '7203020013', nama: 'Kaleroang', level: 2 },
    { kode: '7203020014', nama: 'Waru Waru', level: 2 },
    { kode: '7203020015', nama: 'Padabale', level: 2 },
    { kode: '7203020016', nama: 'Pado Pado', level: 2 },
    { kode: '7203020017', nama: 'Pulau Bapa', level: 2 },
    { kode: '7203020018', nama: 'Lalemo', level: 2 },
    { kode: '7203020019', nama: 'Lamontoli', level: 2 },
    { kode: '7203020029', nama: 'Bungintende', level: 2 },
    { kode: '7203020030', nama: 'Boelimau', level: 2 },
    { kode: '7203020031', nama: 'Panimbawang', level: 2 },
    { kode: '7203020032', nama: 'Po\'o', level: 2 },
    { kode: '7203020033', nama: 'Umbele Lama', level: 2 },
    { kode: '7203020034', nama: 'Pulau Dua Darat', level: 2 },
    { kode: '7203020035', nama: 'Poaro', level: 2 },
    { kode: '7203021001', nama: 'Bete Bete', level: 2 },
    { kode: '7203021002', nama: 'Padabaho', level: 2 },
    { kode: '7203021003', nama: 'Makarti Jaya', level: 2 },
    { kode: '7203021004', nama: 'Labota', level: 2 },
    { kode: '7203021005', nama: 'Fatufia', level: 2 },
    { kode: '7203021006', nama: 'Keurea', level: 2 },
    { kode: '7203021007', nama: 'Bahomakmur', level: 2 },
    { kode: '7203021008', nama: 'Bahodopi', level: 2 },
    { kode: '7203021009', nama: 'Lalampu', level: 2 },
    { kode: '7203021010', nama: 'Siumbatu', level: 2 },
    { kode: '7203021011', nama: 'Dampala', level: 2 },
    { kode: '7203021012', nama: 'Lele', level: 2 },
    { kode: '7203022001', nama: 'Were Ea', level: 2 },
    { kode: '7203022002', nama: 'Sambalagi', level: 2 },
    { kode: '7203022003', nama: 'Laroenai', level: 2 },
    { kode: '7203022004', nama: 'Buleleng', level: 2 },
    { kode: '7203022005', nama: 'Torete', level: 2 },
    { kode: '7203022006', nama: 'Lafeu', level: 2 },
    { kode: '7203022007', nama: 'Tanda Oleo', level: 2 },
    { kode: '7203022008', nama: 'One Ete', level: 2 },
    { kode: '7203022009', nama: 'Tangofa', level: 2 },
    { kode: '7203022010', nama: 'Puungkeu', level: 2 },
    { kode: '7203030011', nama: 'Puungkoilu', level: 2 },
    { kode: '7203030012', nama: 'Bahontobungku', level: 2 },
    { kode: '7203030013', nama: 'Tofuti', level: 2 },
    { kode: '7203030014', nama: 'Sakita', level: 2 },
    { kode: '7203030015', nama: 'Mendui', level: 2 },
    { kode: '7203030016', nama: 'Tofoiso', level: 2 },
    { kode: '7203030017', nama: 'Marsaoleh', level: 2 },
    { kode: '7203030018', nama: 'Lamberea', level: 2 },
    { kode: '7203030019', nama: 'Bungi', level: 2 },
    { kode: '7203030020', nama: 'Matano', level: 2 },
    { kode: '7203030021', nama: 'Matansala', level: 2 },
    { kode: '7203030022', nama: 'Bahoruru', level: 2 },
    { kode: '7203030023', nama: 'Ipi', level: 2 },
    { kode: '7203030024', nama: 'Bente', level: 2 },
    { kode: '7203030025', nama: 'Bahomohoni', level: 2 },
    { kode: '7203030026', nama: 'Bahomoleo', level: 2 },
    { kode: '7203030027', nama: 'Bahomante', level: 2 },
    { kode: '7203030028', nama: 'Lanona', level: 2 },
    { kode: '7203030029', nama: 'Tudua', level: 2 },
    { kode: '7203031001', nama: 'Onepute Jaya', level: 2 },
    { kode: '7203031002', nama: 'Bahomotefe', level: 2 },
    { kode: '7203031003', nama: 'Bahomoahi', level: 2 },
    { kode: '7203031004', nama: 'Ululere', level: 2 },
    { kode: '7203031005', nama: 'Kolono', level: 2 },
    { kode: '7203031006', nama: 'Geresa', level: 2 },
    { kode: '7203031007', nama: 'Laroue', level: 2 },
    { kode: '7203031008', nama: 'Nambo', level: 2 },
    { kode: '7203031009', nama: 'Unsongi', level: 2 },
    { kode: '7203031010', nama: 'Lahuafu', level: 2 },
    { kode: '7203040001', nama: 'Bahoea Reko Reko', level: 2 },
    { kode: '7203040002', nama: 'Wosu', level: 2 },
    { kode: '7203040003', nama: 'Larobenu', level: 2 },
    { kode: '7203040004', nama: 'Umpanga', level: 2 },
    { kode: '7203040005', nama: 'Tofogaro', level: 2 },
    { kode: '7203040006', nama: 'Tondo', level: 2 },
    { kode: '7203040007', nama: 'Ambunu', level: 2 },
    { kode: '7203040008', nama: 'Marga Mulya', level: 2 },
    { kode: '7203040009', nama: 'Uedago', level: 2 },
    { kode: '7203040010', nama: 'Wata', level: 2 },
    { kode: '7203041001', nama: 'Parilangke', level: 2 },
    { kode: '7203041002', nama: 'Beringin Jaya', level: 2 },
    { kode: '7203041003', nama: 'Bahonsuai', level: 2 },
    { kode: '7203041004', nama: 'Samarenda', level: 2 },
    { kode: '7203041005', nama: 'Atananga', level: 2 },
    { kode: '7203041006', nama: 'Lambelu', level: 2 },
    { kode: '7203041007', nama: 'Limbo Makmur', level: 2 },
    { kode: '7203041008', nama: 'Pebatae', level: 2 },
    { kode: '7203041009', nama: 'Karaupa', level: 2 },
    { kode: '7203041010', nama: 'Umbele', level: 2 },
    { kode: '7203041011', nama: 'Harapan Jaya', level: 2 },
    { kode: '7203041012', nama: 'Pebotoa', level: 2 },
    { kode: '7203041013', nama: 'Lasampi', level: 2 },
    { kode: '7203042001', nama: 'Puntari Makmur', level: 2 },
    { kode: '7203042002', nama: 'Sampeantaba', level: 2 },
    { kode: '7203042003', nama: 'Lantula Jaya', level: 2 },
    { kode: '7203042004', nama: 'Bumi Harapan', level: 2 },
    { kode: '7203042005', nama: 'Emea', level: 2 },
    { kode: '7203042006', nama: 'Moahino', level: 2 },
    { kode: '7203042007', nama: 'Ungkaya', level: 2 },
    { kode: '7203042008', nama: 'Solonsa Jaya', level: 2 },
    { kode: '7203042009', nama: 'Solonsa', level: 2 },

  ]);
  console.log('insert data desa');
	
  process.exit(1);
}

running();