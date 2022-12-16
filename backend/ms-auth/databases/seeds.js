const db = require("../app/models");
const bcrypt = require('bcrypt');

const running = async () => {

  await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

	// await db.dropCollection('admins')
	
  await db.admin.deleteMany({})
  await db.admin.insertMany([
    { nama: 'Admin Kemiskinan', level: 1, keterangan: 'Kemiskinan Admin utama' },
    { nama: 'Admin Desa Kemiskinan', level: 2, keterangan: 'Kemiskinan Admin desa' },
  ]);
  console.log('insert data other admin');

  await db.login.deleteMany({})
  await db.login.insertMany([
    { name: 'Super Administrator', username: 'super-admin', level: 1, password: bcrypt.hashSync('123456', 10), status: 1 },
    { name: 'Administrator', username: 'admin', level: 2, password: bcrypt.hashSync('123456', 10), status: 1 },
    { name: 'Admin Kemiskinan', username: 'admin-kemiskinan', level: 3, level_akun: 1, password: bcrypt.hashSync('123456', 10), status: 1 },
    { name: 'Admin Testing', username: 'admin-testing', level: 3, level_akun: 1, password: bcrypt.hashSync('testing', 10), status: 1 },
  ]);
  console.log('insert data user');


	let dataPenduduk = [
		{nama: 'Muhammad Fahri Rahman', nik: '654321', alamat: { kabupaten_kode: '1', kecamatan_kode: '1', kelurahan_kode: '1', kabupaten_nama: 'Morowali', kecamatan_nama: 'Bungku Tengah', kelurahan_nama: 'Bente', alamat_nama: 'Jalur 2', }},
		{nama: 'Muhammad Fahri Rahman2', nik: '1654321', alamat: { kabupaten_kode: '1', kecamatan_kode: '1', kelurahan_kode: '1', kabupaten_nama: 'Morowali', kecamatan_nama: 'Bungku Tengah', kelurahan_nama: 'Bente', alamat_nama: 'Jalur 2', }},
	];
	let dataPegawai = [
		{nama: 'Hafid Dwi Hibatullah', nip: '123456', posisi: [{ opd_nama: 'Kominfo', opd_kode: '01', jabatan_nama: 'Kepala', opd_id: 1, jabatan_level: 1 }]},
		{nama: 'Hafid Dwi Hibatullah2', nip: '1234562', posisi: [{ opd_nama: 'Kominfo', opd_kode: '01', jabatan_nama: 'Kepala', opd_id: 1, jabatan_level: 1 }]},
	];

	var tmpData = [];
	dataPegawai.forEach( (e)  =>  {
		tmpData.push({ name: e.nama, username: e.nip, level: 4, password: bcrypt.hashSync('123456', 10), status: 1 });
	})
	await db.login.insertMany(tmpData);
  console.log('insert data user pegawai');

	var tmpData = [];
	dataPenduduk.forEach( (e)  =>  {
		tmpData.push({ name: e.nama, username: e.nik, level: 5, password: bcrypt.hashSync('123456', 10), status: 1 });
	})
	await db.login.insertMany(tmpData);
  console.log('insert data user penduduk');

	let dataLogin = await db.login.find({});

	tmpData = []
	for(let i = 0; i < dataPegawai.length; i++){
		for(let j = 0; j < dataLogin.length; j++){
			if(dataLogin[j].username == dataPegawai[i].nip && dataLogin[j].level == 4){
				tmpData.push(
					{nama: dataPegawai[i].nama, nip: dataPegawai[i].nip, login_id: dataLogin[j]._id, posisi: [
						{
							opd_nama: dataPegawai[i].posisi[0].opd_nama,
							opd_kode: dataPegawai[i].posisi[0].opd_kode,
							jabatan_nama: dataPegawai[i].posisi[0].jabatan_nama,
							jabatan_level: dataPegawai[i].posisi[0].jabatan_level,
						}
					]}
				);
			}
		}
	}
  await db.pegawai.deleteMany({})
	await db.pegawai.insertMany(tmpData);
  console.log('insert data pegawai');


	tmpData = []
	for(let i = 0; i < dataPenduduk.length; i++){
		for(let j = 0; j < dataLogin.length; j++){
			if(dataLogin[j].username == dataPenduduk[i].nik && dataLogin[j].level == 5){
				tmpData.push(
					{nama: dataPenduduk[i].nama, nik: dataPenduduk[i].nik, login_id: dataLogin[j]._id, alamat: dataPenduduk[i].alamat}
				);
			}
		}
	}
  await db.penduduk.deleteMany({})
	await db.penduduk.insertMany(tmpData);
  console.log('insert data penduduk');


  process.exit();
}

running();