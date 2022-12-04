import axios from 'axios';

const getSession = async (token) => {
	try{
		let data = await axios.get(process.env.API_GATEWAY+'auth/cek-login', { headers: { 'Authorization': token } });
		if(data.data.statusCode != 200) return { statusCode: 500, message: 'Bearer is invalid' }
		return { statusCode: 200, data: data.data }
	}catch(err){
		return { statusCode: 500, message: 'Bearer is invalid' }
	}
}

export default {
  checkUser: async (req, res, next) => {

    try{

			let data = await getSession(req.header("authorization"))
			if(data.statusCode != 200) return res.status(data.statusCode).send({
				statusCode: data.statusCode,
				message: data.message
			})
			
			req.session = data.data.session;
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: 'Bearer is invalid'
			})
		}

    next();
  },
  checkAdmin: async (req, res, next) => {

    try{

			let data = await getSession(req.header("authorization"))
			if(data.statusCode != 200) return res.status(data.statusCode).send({
				statusCode: data.statusCode,
				message: data.message
			})
			let session = data.data.session;
			

			if(![1,2,3].includes(session.level)) return res.status(400).send({ statusCode: 400, message: 'your account has no access!' })
			if(session.level == 3 && session.level_akun != 1) return res.status(400).send({ statusCode: 400, message: 'your account has no access!' })
			
			req.session = session;

		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: 'Bearer is invalid'
			})
		}

    next();
  },
}