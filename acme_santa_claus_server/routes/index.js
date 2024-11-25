const express = require("express");
const router = express.Router();
const employeeRouter = require("./employees");
const authRouter = require("./authentication");
const secretChildRouter = require("./secretChild");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

router.use("/employees", employeeRouter);
router.use("/auth", authRouter);
router.use("/gift", authorizationMiddleware, secretChildRouter);

module.exports = router;
