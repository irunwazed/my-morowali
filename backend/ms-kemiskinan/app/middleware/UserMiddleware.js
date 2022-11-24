var axios = require('axios');

export default {
  getSession: async (req, res, next) => {

    try{
			let data = await axios.get('http://127.0.0.1:3000/auth/cek-login', {
				headers: {
					'Authorization': req.header("authorization")
				}
			});
			if(data.data.statusCode != 200){
				return res.status(500).send({
					message: 'Bearer is invalid'
				})
			}
			// res.locals.session = data.data.session;
			req.session = data.data.session;
		}catch(err){
			return res.status(500).send({
				message: 'Bearer is invalid'
			})
		}

    next();
  }
}