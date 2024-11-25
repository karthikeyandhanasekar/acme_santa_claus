const { body, validationResult } = require("express-validator");

exports.employeeRegisterValidation = async (req, res, next) => {
  const rules = [
    body("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Name is mandatory")
      .isString()
      .withMessage("Name must be a valid string")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name accept only alphabets"),

    // Validate "mail" field
    body("mail")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is mandatory")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .withMessage("Email must be in a valid format (e.g., user@example.com)"),

    // Validate "phone" field
    body("phone")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Phone number is mandatory")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 digits")
      .matches(/^[0-9]+$/)
      .withMessage("Phone number must contain only numeric digits"),

    // Validate "phone" field
    body("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Password is mandatory")
      .isString()
      .withMessage("Password must be an valid string")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .withMessage(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
      ),
  ];
  await Promise.all(
    rules.map((rule) => {
      return rule.run(req);
    })
  );
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

exports.employeeUpdateValidation = async (req, res, next) => {
  const rules = [
    body("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Name is mandatory")
      .isString()
      .withMessage("Name must be a valid string")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name accept only alphabets"),

    // Validate "mail" field
    body("mail")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is mandatory")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .withMessage("Email must be in a valid format (e.g., user@example.com)"),

    // Validate "phone" field
    body("phone")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Phone number is mandatory")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 digits")
      .matches(/^[0-9]+$/)
      .withMessage("Phone number must contain only numeric digits"),
  ];
  await Promise.all(
    rules.map((rule) => {
      return rule.run(req);
    })
  );
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

exports.loginValidation = async (req, res, next) => {
  const rules = [
    // Validate "mail" field
    body("mail")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is mandatory")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .withMessage("Email must be in a valid format (e.g., user@example.com)"),
    // Validate "phone" field
    body("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Password is mandatory")
      .isString()
      .withMessage("Password must be an valid string"),
  ];
  await Promise.all(
    rules.map((rule) => {
      return rule.run(req);
    })
  );
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

exports.csvFileUploadValidation = async (req, res, next) => {
  const rules = [
    body("file").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("File is required");
      } else if (!req.file.originalname.toLowerCase().endsWith(".csv"))
        throw new Error("Only CSV files are allowed");
      else return true;
    }),
  ];
  await Promise.all(
    rules.map((rule) => {
      return rule.run(req);
    })
  );
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
