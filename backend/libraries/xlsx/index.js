const reader = require('xlsx')

await db.mongoose.connect(db.url, {
   useNewUrlParser: true,
   useUnifiedTopology: true
 })
  
// Reading our test file
const file = reader.readFile('./data/penduduk.xlsx')
  
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}
  
// Printing data
console.log(data[0])



let result = data.map(res => {

   let tgl = res['Tanggal Lahir'].split(" ")[0].split("/");
   let day = tgl[0].length==1?'0'+tgl[0]:tgl[0];
   let month = tgl[1].length==1?'0'+tgl[1]:tgl[1];
   let year = tgl[2];
   tgl = year+'-'+month+"-"+day;

   let kawin = { 'Belum Kawin': 1, 'Cerai Hidup': 2, 'Cerai Mati': 3, 'Kawin': 4}; 
   let pendidikan = {'Tidak/belum sekolah': 1, 'Tidak tamat SD/sederajat': 2, 'Siswa SD/sederajat': 3, 'Tamat SD/sederajat': 4, 'Siswa SMP/sederajat': 5, 'Tamat SMP/sederajat': 6, 'Siswa SMA/sederajat': 7, 'Tamat SMA/sederajat': 8, 'Mahasiswa Perguruan Tinggi': 9, 'Tamat Perguruan Tinggi': 10}; 

   return {
      nama: res['Nama'],
      nik: res['NIK'],
      jk: res['Jenis Kelamin']=='Laki-laki'?'L':'P',
      lahir:{
         tempat: '',
         tanggal: tgl,
      },
      alamat: {
         provinsi_nama: res['Provinsi'],
         kabupaten_nama: res['Kabupaten/Kota'],
         kecamatan_nama: res['Kecamatan'],
         kelurahan_nama: res['Desa/Kelurahan'],
         alamat_nama: res['Alamat'],
      },
      status_pernikahan: kawin[res['Status Kawin']],
      pendidikan_id: pendidikan[res['Pendidikan']],
      hidup: true,
   };

   return {
      no_kk: res['ID Keluarga P3KE'],
      provinsi: res['Provinsi'],
      kabupaten: res['Kabupaten/Kota'],
      kelurahan: res['Desa/Kelurahan'],
      kesejahteraan: res['Desil Kesejahteraan'],
      alamat: res['Alamat'],
      nama: res['Nama'],
      nik: res['NIK'],
      jk: res['Jenis Kelamin']=='Laki-laki'?'L':'P',  
      hubkel: res['Hubungan dengan Kepala Keluarga'],
      lahir: tgl,
      status_pernikahan: kawin[res['Status Kawin']],
      pekerjaan: res['Pekerjaan'],
      pendidikan: pendidikan[res['Pendidikan']],
      BPNT: res['Penerima BPNT']=='Ya'?true:false,
      BPUM: res['Penerima BPUM']=='Ya'?true:false,
      BST: res['Penerima BST']=='Ya'?true:false,
      PKH: res['Penerima PKH']=='Ya'?true:false,
      SEMBAKO: res['Penerima SEMBAKO']=='Ya'?true:false,
      data: {
         p3ke_individu_id: res['ID Individu'],
         p3ke_keluarga_id: res['ID Keluarga P3KE'],
         'Padan Dukcapil': res['Padan Dukcapil'],
      }
   }
})


console.log(result[0])