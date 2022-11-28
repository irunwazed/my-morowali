const { createProxyMiddleware } = require('http-proxy-middleware');

const setProxy = (app, routes) => {
	routes.forEach(element => {
		app.use(element.path, createProxyMiddleware(element.proxy));
	});
}

module.exports = setProxy