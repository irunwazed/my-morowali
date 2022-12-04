import express from "express";
import {router, routerAdmin} from "./config/router";
import fileUpload from "express-fileupload";
// import cors from 'cors';

const app = express();
// app.use(cors());
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 },
  useTempFiles : true,
}));
app.use(express.static(__dirname + '/../public'));
app.use(express.urlencoded({ extended: true }));
app.use("/admin", routerAdmin);
app.use("/", router);

export default app;