import jwt from "jsonwebtoken";
import {
	validationResult
} from "express-validator";
import db from "../../models";
import bcrypt from "bcrypt";

export default class LoginController {
	static async login(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				errors: errors.array(),
			});
		}

		let user = await db.users.find({
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
			},
			process.env.JWT_SECRET_KEY
		);
		res.send({
			message: "login success!",
			status: true,
			token: token,
		});
	}

	static cekLogin(req, res) {
		let bearerHeader = req.header("authorization");
		if (typeof bearerHeader === "undefined")
			return res.status(404).send({
				message: "No credentials sent!",
			});

		let bearer = bearerHeader.split(" ");
		if (bearer.length != 2)
			return res.status(404).send({
				message: "Bearer is invalid",
			});

		bearer = bearer[1];
		let decoded = "";
		try {
			decoded = jwt.verify(bearer, process.env.JWT_SECRET_KEY);
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}

		return res.send({
			message: "credentials is valid!",
			session: {
				username: decoded.username,
				id: decoded.id,
			},
		});
	}
}