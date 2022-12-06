const axios = require('axios');

module.exports =  {
  getSession: async (req, res, next) => {

    try{
			let data = await axios.get(process.env.API_GATEWAY+'auth/cek-login', {
				headers: {
					'Authorization': req.header("authorization")
				}
			});
			if(data.data.statusCode != 200){
				return res.status(500).send({
					statusCode: 500,
					message: 'Bearer is invalid'
				})
			}
			req.session = data.data.session;
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: 'Bearer is invalid'
			})
		}

    next();
  }
}