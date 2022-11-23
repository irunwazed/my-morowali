export default class HomeController {
	static async index(req, res) {

		let api = {
			status: true,
			data: [],
		};
		return res.send(api);
	}

	static async notFound(req, res) {
		let api = {
			status: false,
			message: "pages not found!",
		};
		return res.status(404).send(api);
	}
}