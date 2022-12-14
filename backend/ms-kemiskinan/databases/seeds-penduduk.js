const db = require('../app/models');
const reader = require('xlsx');
const eksport = require('../app/libraries/eksport');

const running = async () => {

  await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

	let nameFile = process.argv[2]?process.argv[2]:'penduduk';
	let setDelete = process.argv[3]=='true'?true:false;

  console.log('proses load data keluarga => '+nameFile)
  const file = reader.readFile('./../../documentation/data/'+nameFile+'.xlsx')
  
  let data = []
    
  const sheets = file.SheetNames
    
  for(let i = 0; i < sheets.length; i++)
  {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
        data.push(res)
    })
  }
    
  console.log('proses input keluarga')

	if(setDelete){
		await db.penduduk.deleteMany({}) 
		await db.keluarga.deleteMany({}) 
		await db.keluarga_penduduk.deleteMany({}) 
		console.log('hapus data')
	}else{
		console.log('tidak hapus data')
	}
	
  await eksport.keluarga(data, 0);

  process.exit();
}




running();