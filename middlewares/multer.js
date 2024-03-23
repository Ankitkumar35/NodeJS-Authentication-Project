// middleware/multer.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Specify the directory where uploaded photos will be stored
const uploadDir = path.join(__dirname, '..', 'uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const name=`${timestamp}_${file.originalname}`
    cb(null, name);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
