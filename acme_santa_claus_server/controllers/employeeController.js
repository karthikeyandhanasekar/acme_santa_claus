const mysqlDb = require("../services/mysql_db"); // Import the global database connection
const { isObjectEmpty } = require("../utils/generalFunctions"); // Utility function to check if an object is empty
const { hashValue } = require("../services/bcrypt");
/**
 * Reusable function to fetch employee details by ID.
 * @param {number} id - Employee ID.
 * @returns {object|null} Employee details or null if not found.
 */
const getEmployeeById = async (id) => {
  const query =
    "SELECT employees_id,employee_name,employee_mail,employees_phone,createdDate FROM employees_details WHERE employees_id = ?";
  const [rows] = await mysqlDb.query(query, [id]);
  if (typeof rows === "object") {
    return isObjectEmpty(rows) ? null : rows;
  }
  return rows.length > 0 ? rows[0] : null; // Return the employee or null if not found
};

exports.getEmployeesController = async (req, res, next) => {
  try {
    const sqlQuery =
      "SELECT employees_id,employee_name,employee_mail,employees_phone,createdDate FROM employees_details LIMIT 1000";
    const [employeesDetails] = await mysqlDb.query(sqlQuery);

    if (employeesDetails.length === 0) {
      return res.status(404).json({ employeesDetails });
    }
    return res.status(200).json({ employeesDetails });
  } catch (err) {
    next(err); // Forward the error to the error-handling middleware
  }
};

exports.getSpecificEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employeeDetails = await getEmployeeById(id);
    if (!employeeDetails || employeeDetails.length === 0) {
      return res.status(404).json({ employeeDetails });
    }
    return res.status(200).json({ employeeDetails });
  } catch (err) {
    next(err); // Forward the error to the error-handling middleware
  }
};

exports.registerEmployee = async (req, res, next) => {
  try {
    const { name, mail, phone, password } = req.body;
    const checkEmailQuery =
      "SELECT COUNT(*) AS count FROM employees_details WHERE employee_mail = ? OR employees_phone = ?";
    const [emailCheck] = await mysqlDb.query(checkEmailQuery, [mail, phone]);

    // Check if email or phone number already exists
    if (!isObjectEmpty(emailCheck) && emailCheck[0].count > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Email/PhoneNo already exists. Please use a different email/phoneNo.",
      });
    }

    // Hash the password before storing
    let hashedPassword = password;
    if (password) {
      hashedPassword = await hashValue(hashedPassword);
    }

    // Insert the employee details into the database
    const sqlQuery =
      "INSERT INTO employees_details (employee_name, employee_mail, employees_phone, employee_password) VALUES (?, ?, ?, ?)";
    const [rows] = await mysqlDb.query(sqlQuery, [
      name,
      mail,
      phone,
      hashedPassword,
    ]);
    return res.status(201).json({
      success: true,
    });
  } catch (err) {
    next(err); // Forward the error to the error-handling middleware
  }
};

exports.modifyExistingEmployee = async (req, res, next) => {
  try {
    const { name, mail, phone, password } = req.body;
    const { id } = req.params;
    const employeeDetails = await getEmployeeById(id);

    // Check if the employee exists in the database
    if (!employeeDetails || employeeDetails.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Employee is not in the records" });
    }

    // Update the employee details in the database
    const sqlQuery =
      "UPDATE employees_details SET employee_name = ?, employee_mail = ?, employees_phone = ? WHERE employees_id = ?";
    const [rows] = await mysqlDb.query(sqlQuery, [name, mail, phone, id]);

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
    });
  } catch (err) {
    next(err); // Forward the error to the error-handling middleware
  }
};

exports.removeEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employeeDetails = await getEmployeeById(id);

    // Check if the employee exists in the database
    if (!employeeDetails || employeeDetails.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Employee is not in the records" });
    }

    // Delete the employee record from the database
    const sqlQuery = "DELETE FROM employees_details WHERE employees_id = ?";
    await mysqlDb.query(sqlQuery, [id]);

    return res.status(200).json({
      success: true,
      message: "Employee record removed successfully.",
    });
  } catch (err) {
    next(err); // Forward the error to the error-handling middleware
  }
};
