const reader = require('xlsx')
  
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
   return {
      no_kk: res['ID Keluarga P3KE'],
      provinsi: res['Provinsi'],
      kabupaten: res['Kabupaten/Kota'],
      kelurahan: res['Desa/Kelurahan'],
      kesejahteraan: res['Desil Kesejahteraan'],
      alamat: res['Alamat'],
      nama: res['Nama'],
      nik: res['NIK'],
      jk: res['Jenis Kelamin'],  
      hubkel: res['Hubungan dengan Kepala Keluarga'],
      lahir: res['Tanggal Lahir'],
      status_kawin: res['Status Kawin'],
      pekerjaan: res['Pekerjaan'],
      pendidikan: res['Pendidikan'],
      bpnt: res['Penerima BPNT'],
      BPUM: res['Penerima BPUM'],
      BST: res['Penerima BST'],
      PKH: res['Penerima PKH'],
      SEMBAKO: res['Penerima SEMBAKO'],
      data: {
         p3ke_individu_id: res['ID Individu'],
         p3ke_keluarga_id: res['ID Keluarga P3KE'],
         'Padan Dukcapil': res['Padan Dukcapil'],
      }
   }
})


console.log(result[0])