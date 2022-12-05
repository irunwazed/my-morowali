const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;
app.use(cors())

const setProxy = require('./middlewares/proxy');
const setAuth = require('./middlewares/auth');
const ROUTES = require('./config/routes');

setAuth(app, ROUTES);
setProxy(app, ROUTES);


app.listen(port, () => {
  console.log(`API GATEWAY is running on port ${port}`);
});