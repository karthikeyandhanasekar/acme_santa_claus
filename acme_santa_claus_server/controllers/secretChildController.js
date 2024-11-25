const fs = require("fs"); // Import the global database connection
const path = require("path");
const {
  parseCSV,
  jsonToCSV,
  getFoldersName,
} = require("../utils/generalFunctions");
const { getCurrentYear, getLastYear } = require("../utils/dateFunction");

/**
 * Function to assign Secret Santa pairings
 * @param {Array} employees - List of employees participating in the event.
 * @param {Array} lastYearData - Last year's Secret Santa assignments.
 * @returns {Array} - List of this year's Secret Santa assignments.
 */
const assignSecretSanta = (employees, lastYearData) => {
  // Clone the employees list to use as potential secret children
  const availableChildren = [...employees];
  const assignments = [];

  for (let employee of employees) {
    let assignedChild = null;

    // Filter available children to meet the rules
    const validChildren = availableChildren.filter((child) => {
      // Rule 1: An employee cannot choose themselves
      if (employee.Employee_EmailID === child.Employee_EmailID) return false;

      // Rule 2: Employee cannot be assigned the same child as last year
      const lastYearAssignment = lastYearData.find(
        (entry) => entry.Employee_EmailID === employee.Employee_EmailID
      );
      if (
        lastYearAssignment &&
        lastYearAssignment.Secret_Child_EmailID === child.Employee_EmailID
      ) {
        return false;
      }

      return true;
    });

    // Check if there are valid children remaining
    if (validChildren.length === 0) {
      throw new Error(
        `Unable to find a valid secret child for ${employee.Employee_Name}. Please review the input.`
      );
    }

    // Randomly pick a valid child
    const randomIndex = Math.floor(Math.random() * validChildren.length);
    assignedChild = validChildren[randomIndex];

    // Assign the child and remove them from the available pool
    assignments.push({
      Employee_Name: employee.Employee_Name,
      Employee_EmailID: employee.Employee_EmailID,
      Secret_Child_Name: assignedChild.Employee_Name,
      Secret_Child_EmailID: assignedChild.Employee_EmailID,
    });

    // Remove the assigned child from the available list
    const index = availableChildren.findIndex(
      (child) => child.Employee_EmailID === assignedChild.Employee_EmailID
    );
    availableChildren.splice(index, 1);
  }

  return assignments;
};

const fileNameTemplate = (year) => `secret_child_assignment_result_${year}.csv`;
const documentFolderPath = "../public/documents/";
const absolveDocumentPath = path.join(__dirname, documentFolderPath);

exports.secretChildController = async (req, res, next) => {
  try {
    const lastYearFilePath = path.join(
      __dirname,
      documentFolderPath,
      getLastYear.toString(),
      fileNameTemplate(getLastYear)
    );
    if (!fs.existsSync(lastYearFilePath)) {
      return res.status(404).json({
        success: false,
        message: "Last Year Data is missing",
      });
    }

    const lastYearData = await parseCSV(lastYearFilePath);
    const filePath = path.resolve(req.file.path);
    const employees = await parseCSV(filePath, true);
    const fileName = fileNameTemplate(getCurrentYear);
    const totalAssignment = assignSecretSanta(employees, lastYearData);

    const outputFolder = path.join(
      __dirname,
      documentFolderPath,
      getCurrentYear.toString()
    );
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    const outputFilePath = path.join(outputFolder, fileName);
    jsonToCSV(totalAssignment, outputFilePath);
    const yearList = await getFoldersName(absolveDocumentPath);

    return res.status(200).json({
      success: true,
      yearList,
      totalAssignment,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAvailableYears = async (req, res, next) => {
  try {
    const yearList = await getFoldersName(absolveDocumentPath);
    return res.status(200).json({
      success: true,
      yearList,
    });
  } catch (error) {
    next(error);
  }
};

exports.getYearData = async (req, res, next) => {
  try {
    const year = req.params.year;
    const absolveDocumentFilePath = path.join(
      absolveDocumentPath,
      year,
      fileNameTemplate(year)
    );
    const yearData = await parseCSV(absolveDocumentFilePath);
    return res.status(200).json({
      success: true,
      yearData,
    });
  } catch (error) {
    next(error);
  }
};
