const router = require("express").Router();
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");
const authRoutes = require("./auth");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;
