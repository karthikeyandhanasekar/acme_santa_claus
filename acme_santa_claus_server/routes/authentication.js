const express = require("express");
const router = express.Router();
const {
  loginValidation,
} = require("../middleware/requestValidationMiddleware");

const { loginController } = require("../controllers/authenticationController");

router.post("/login", loginValidation, loginController);

module.exports = router;
