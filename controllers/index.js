const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoute");
const dashboardRoutes = require("./dashboardRoute");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
// for any other router that cannot be identified before this rou?ter, homeRoutes will be used
router.use("*", homeRoutes);

module.exports = router;
