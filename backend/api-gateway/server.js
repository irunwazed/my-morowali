const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

const setProxy = require('./middlewares/proxy');
const setAuth = require('./middlewares/auth');
const ROUTES = require('./config/routes');

setAuth(app, ROUTES);
setProxy(app, ROUTES);

app.listen(port, () => {
  console.log(`API GATEWAY is running on port ${port}`);
});