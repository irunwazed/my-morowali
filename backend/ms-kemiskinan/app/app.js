const express = require("express");
const {router, routerAdmin} = require("./config/router");
const fileUpload = require("express-fileupload");


// const bodyParser = require('body-parser');

const app = express();
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 20 * 1024 * 1024 },
  useTempFiles : true,
}));
// app.use(fileUpload());
app.use(express.static(__dirname + '/../public'));
app.use(express.urlencoded({ extended: true }));
app.use("/admin", routerAdmin);
app.use("/", router);

module.exports = app;