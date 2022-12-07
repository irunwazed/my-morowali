module.exports = {
  upload:  async (file, name, path = '/', options = {maxSize: 200} ) => {

    let filePath = '/storages/images'+path+name;
    let image = '/storages/images/no-images.png';
    path = __dirname+'/../../public/storages/images'+path+name;

    let maxSize = options.maxSize?options.maxSize:200;

    if(!file) return { status: false, file: image, message: 'file not found'};
    if(file.size > (maxSize*1024)) return { status: false, file: image, message: 'file is too big, max = '+ maxSize+ ' kb'};
    
    try{
      await file.mv(path);
      return { status: true, file: filePath }
    }catch(err){
      return { status: false, file: image, message: err};
    }
    // return { status: false, file: image };
  }
}