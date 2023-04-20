const router = require("express").Router();
const userRoute = require("./userRoute");

router.use("/user", userRoute);
// router.use("/projects", projectRoutes);

module.exports = router;
