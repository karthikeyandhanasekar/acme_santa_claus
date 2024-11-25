const express = require("express");
const router = express.Router();
const {
  employeeRegisterValidation,
  employeeUpdateValidation,
} = require("../middleware/requestValidationMiddleware"); // Middleware for validating employee registration and update requests

const {
  getSpecificEmployee,
  registerEmployee,
  getEmployeesController,
  modifyExistingEmployee,
  removeEmployee,
} = require("../controllers/employeeController");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

/**
 * Route to fetch all employee details with a limit of 1000 records.
 * Responds with a 404 if no records are found.
 */
router.get("/", authorizationMiddleware, getEmployeesController);

/**
 * Route to fetch employee details by ID.
 * Responds with 404 if the employee is not found.
 */
router.get("/:id", authorizationMiddleware, getSpecificEmployee);

/**
 * Route to register a new employee.
 * Performs email and phone validation to prevent duplicate records.
 * Hashes the password before saving to the database.
 */
router.post("/", employeeRegisterValidation, registerEmployee);

/**
 * Route to update existing employee details by ID.
 * Validates input and hashes the password if provided.
 */
router.put(
  "/:id",
  authorizationMiddleware,
  employeeUpdateValidation,
  modifyExistingEmployee
);

/**
 * Route to delete an employee record by ID.
 * Checks if the employee exists before attempting deletion.
 */
router.delete("/:id", authorizationMiddleware, removeEmployee);

module.exports = router;
