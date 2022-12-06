const axios = require('axios');

const sendRequest = async (url, headers) => {
  try{
    let data = await axios.get(url, headers);
    return (!data.data.data)?data.data:data.data.data;
    
  }catch(err){
    return {statusCode: 500, message: 'Server Error' }
  }
}

const services = {
  getDataOPD: async (req) =>{
    let data = await sendRequest(process.env.API_GATEWAY+'organisasi/get/opd', { headers: { 'Authorization': req.header("authorization") } });
    return data;
  },
  getOPDByKode: async (req, kode) =>{
    let data = await sendRequest(process.env.API_GATEWAY+'organisasi/get/opd/'+kode, { headers: { 'Authorization': req.header("authorization") } });
    return data;
  },
}

module.exports = services;