const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { formattedDate } = require("../utils/dateFunction");
const { log } = require("console");
const todayDate = formattedDate(new Date());

const folderDirectory = path.join(__dirname, "../", "uploads", todayDate);
if (!fs.existsSync(folderDirectory)) {
  fs.mkdirSync(folderDirectory, { recursive: true });
}

// Set storage options
// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploaded files
    cb(null, folderDirectory); // Change "uploads/" to your desired folder
  },
  filename: (req, file, cb) => {
    // Customize the uploaded file name
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname); // Get the file extension
    const baseName = path.basename(file.originalname, ext); // Get the file name without extension
    cb(null, `${baseName}_${uniqueSuffix}${ext}`); // Save with a unique name
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check file type
    if (["text/csv"].includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      const error = new Error("Only CSV files are allowed");
      error.status = 400; // Optional: Set an HTTP status code
      cb(error, false); // Reject the file
    }
  },
});

module.exports = upload;
