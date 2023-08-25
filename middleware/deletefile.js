const fs = require("fs");
const path = require("path");

const fileToDeletePath = (filePath) => {
  const fullPath = path.join(__dirname, "../", filePath); // Adjust the path accordingly
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted!");
    }
  });
};


module.exports = { fileToDeletePath };
