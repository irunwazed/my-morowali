const express = require("express");
const {router, routerAdmin} = require("./config/router");
const fileUpload = require("express-fileupload");


const app = express();
// app.use(express.json());
// app.use(fileUpload({
//   limits: { fileSize: 20 * 1024 * 1024 },
//   useTempFiles : true,
// }));
// app.use(fileUpload());
app.use(express.static(__dirname + '/../public'));
app.use(express.urlencoded({ extended: true }));
app.use("/admin", routerAdmin);
app.use("/", router);

module.exports = app;