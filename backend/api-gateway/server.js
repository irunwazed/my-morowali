const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const router = express.Router()
const port = process.env.APP_PORT || 3000;
app.use(cors())

const setProxy = require('./middlewares/proxy');
const setAuth = require('./middlewares/auth');
const ROUTES = require('./config/routes');


// router.get("/", (req, res) => {
//   let api = {
//     statusCode: 200,
//     message: 'Selamat datang di My Morowali',
//   };
//   return res.send(api);
// })

setAuth(app, ROUTES);
setProxy(app, ROUTES);
// app.use("/", router);




app.listen(port, () => {
  console.log(`${process.env.APP_NAME||''} is running on port ${port}`);
});