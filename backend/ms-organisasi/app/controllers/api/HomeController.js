export default class HomeController {
	static async index(req, res) {

		let api = {
			statusCode: 200,
			data: [],
		};
		return res.send(api);
	}

	static async notFound(req, res) {
		let api = {
			statusCode: 404,
			message: "pages not found!",
		};
		return res.status(404).send(api);
	}
}