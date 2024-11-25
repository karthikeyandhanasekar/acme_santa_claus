const { generateToken } = require("../services/tokenService");
const { compareHashValue } = require("../services/bcrypt");
const mysqlDb = require("../services/mysql_db"); // Import the global database connection

exports.loginController = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    const checkEmailQuery =
      "SELECT * FROM employees_details WHERE employee_mail = ?";
    const [employeeDetails] = await mysqlDb.query(checkEmailQuery, [mail]);
    // Check if user exists
    if (!employeeDetails || employeeDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee is not in the records",
      });
    }

    const {
      employees_id,
      employee_name,
      employee_mail,
      employees_phone,
      createdDate,
      employee_password,
    } = employeeDetails[0]; // Extract user record

    // Compare the provided password with the hashed password
    const isPasswordValid = await compareHashValue(password, employee_password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const requiredEmployeeDetails = {
      employees_id,
      employee_name,
      employee_mail,
      employees_phone,
      createdDate,
    };
    const jwtToken = generateToken(requiredEmployeeDetails);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      jwtToken, // Return the token to the client
    });
  } catch (error) {
    next(error);
  }
};
