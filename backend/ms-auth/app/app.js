const express = require("express");
const router = require("./config/router");
// import cors from 'cors';

const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

module.exports = app;