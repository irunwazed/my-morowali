const jwt =  require("jsonwebtoken");
const { validationResult } =  require("express-validator");
const db =  require("../../models");
const bcrypt =  require("bcrypt");

module.exports = class LoginController {
	static async login(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array(),
			});
		}

		let user = await db.login.find({
			username: req.body.username,
		});
		if (user.length != 1)
			return res.status(400).send({
				message: "username not found!",
				status: false,
			});

		if (!bcrypt.compareSync(req.body.password, user[0].password))
			return res.status(400).send({
				message: "wrong password!",
				status: false,
			});

		var token = jwt.sign({
				username: user[0].username,
				id: user[0].id,
				level: user[0].level,
				level_akun: user[0].level_akun,
			},
			process.env.JWT_SECRET_KEY
		);
		res.send({
			statusCode: 200,
			message: "login success!",
			status: true,
			token: token,
		});
	}

	static async cekLogin(req, res) {
		let bearerHeader = req.header("authorization");
		if (typeof bearerHeader === "undefined")
			return res.status(404).send({
				statusCode: 404,
				message: "No credentials sent!",
			});

		let bearer = bearerHeader.split(" ");
		if (bearer.length != 2)
			return res.status(404).send({
				statusCode: 404,
				message: "Bearer is invalid",
			});

		bearer = bearer[1];
		let decoded = "";
		try {
			decoded = jwt.verify(bearer, process.env.JWT_SECRET_KEY);
		} catch (err) {
			return res.status(500).send({
				statusCode: 500,
				message: err.message,
			});
		}

		var akun = {};
		if(decoded.level == 3){
			let tmp = await db.admin.find({level: decoded.level_akun});
			if(tmp.length == 1){
				akun = {
					nama: tmp[0].nama,
					level: tmp[0].level,
					data: tmp[0].data,
				}
			}
		}else if(decoded.level == 4){
			let tmp = await db.pegawai.find({nip: decoded.username});
			if(tmp.length == 1){
				akun = {
					nama: tmp[0].nama,
					nip: tmp[0].nip,
					posisi: tmp[0].posisi,
				}
			}
		}else if(decoded.level == 5){
			let tmp = await db.penduduk.find({nik: decoded.username});
			if(tmp.length == 1){
				akun = {
					nama: tmp[0].nama,
					nik: tmp[0].nik,
					alamat: tmp[0].alamat,
				}
			}
		}

		return res.send({
			statusCode: 200,
			message: "credentials is valid!",
			session: {
				username: decoded.username,
				id: decoded.id,
				level: decoded.level,
				level_akun: decoded.level_akun,
				akun: akun,
			},
		});
	}
}