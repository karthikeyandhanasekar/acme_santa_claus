const express = require("express");
const router = express.Router();
const {
  csvFileUploadValidation,
} = require("../middleware/requestValidationMiddleware");

const upload = require("../services/storage");
const {
  secretChildController,
  getAvailableYears,
  getYearData,
} = require("../controllers/secretChildController");

router.post(
  "/upload",
  upload.single("file"),
  csvFileUploadValidation,
  secretChildController
);

router.get("/availableYears", getAvailableYears);
router.get("/:year", getYearData);


module.exports = router;
