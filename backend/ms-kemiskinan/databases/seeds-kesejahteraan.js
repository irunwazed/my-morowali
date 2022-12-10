const db = require('../app/models');
const reader = require('xlsx');

const running = async () => {

  await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const file = reader.readFile('./../../documentation/data/kesejahteraan.xlsx')
  
  let data = []
    
  const sheets = file.SheetNames
    
  for(let i = 0; i < sheets.length; i++)
  {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
        data.push(res)
    })
  }

  console.log(data[0]);

  
  console.log('proses input kesejahteraan')

  await db.keluarga_kesejahteraan.deleteMany({}) 
  await insert(data, 0);
  

  let tes = await db.keluarga_kesejahteraan.find({});
  console.log('insert data keluarga_kesejahteraan'+tes.length);
  process.exit();
}

let arrKK = [];
async function insert(data, idx){
  if(data[idx]){

    let tmp = await setData(data[idx]);
    await db.keluarga_kesejahteraan.insertMany([tmp]);
    return insert(data, (idx+1));
  }
  return false;
}

let nikArr = [''];
async function setData(e){
  let no_kk =  e['ID Keluarga P3KE'];
  let tmp = await db.keluarga.find({no_kk: no_kk});

  let rumah = await db.ki_rumah.find({ nama: e['Kepemilikan Rumah'] });
  let atap = await db.ki_atap.find({ nama: e['Jenis Atap'] });
  let dinding = await db.ki_dinding.find({ nama: e['Jenis Dinding'] });
  let lantai = await db.ki_lantai.find({ nama: e['Jenis Lantai'] });
  let penerangan = await db.ki_penerangan.find({ nama: e['Sumber Penerangan'] });
  let bahan_bakar = await db.ki_bahan_bakar.find({ nama: e['Bahan Bakar Memasak'] });
  let sumber_air = await db.ki_sumber_air.find({ nama: e['Sumber Air Minum'] });
  let jamban = await db.ki_jamban.find({ nama: e['Memiliki fasilitas Buang Air Besar'] });

  return {
    keluarga_id: tmp[0]._id,
    status_kesejahteraan: e['Desil Kesejahteraan'],
    tahun: 2022,
    indikator: {
      rumah: {
        rumah_id: rumah[0]._id,
        nama: e['Kepemilikan Rumah'],
      },
      atap: {
        atap_id: atap[0]._id,
        nama: e['Jenis Atap'],
      },
      dinding: {
        dinding_id: dinding[0]._id,
        nama: e['Jenis Dinding'],
      },
      lantai: {
        lantai_id: lantai[0]._id,
        nama: e['Jenis Lantai'],
      },
      penerangan: {
        penerangan_id: penerangan[0]._id,
        nama: e['Sumber Penerangan'],
      },
      bahan_bakar: {
        bahan_bakar_id: bahan_bakar[0]._id,
        nama: e['Bahan Bakar Memasak'],
      },
      sumber_air: {
        sumber_air_id: sumber_air[0]._id,
        nama: e['Sumber Air Minum'],
      },
      jamban: {
        jamban_id: jamban[0]._id,
        nama: e['Memiliki fasilitas Buang Air Besar'],
      },
      simpanan: e['Memiliki Simpanan Uang/Perhiasan/Ternak/Lainnya']=='Ya'?true:false,
    },
  };
}



running();