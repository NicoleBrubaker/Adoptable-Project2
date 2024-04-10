const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const router = require("express").Router();
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");
const authRoutes = require("./auth");
const faveRoutes = require("./favorites");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);
router.use("/favorite", faveRoutes)

module.exports = router;