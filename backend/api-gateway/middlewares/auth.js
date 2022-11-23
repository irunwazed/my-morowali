var axios = require('axios');

const setAuth = (app, routes) => {

	routes.forEach(route => {
		if(route.auth){
			app.use(route.path, async (req, res, next) => {
				try{
					let data = await axios.get('http://127.0.0.1:3000/auth/cek-login', {
						headers: {
							'Accept': 'application/json',
							'Authorization': req.header("authorization")
						}
					});
					if(data.data.statusCode != 200){
						return res.status(500).send({
							message: 'Bearer invalid'
						})
					}
				}catch(err){
					return res.status(500).send({
						message: 'Bearer invalid'
					})
				}
				next();
			});
		}
	});
}
module.exports = setAuth