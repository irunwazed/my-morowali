module.exports = class HomeController {
	static async index(req, res) {

		let api = {
			status: false,
			data: [],
		};
		return res.send(api);
	}

	static async notFound(req, res) {
		let api = {
			status: false,
			message: "pages not found!",
		};
		res.status(404).send(api);
	}
}