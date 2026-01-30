const multer = require("multer");
const fs = require("fs");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const imagesDir = path.join(__dirname, "..", "images");
console.log("multer imagesDir:", imagesDir);
if (!fs.existsSync(imagesDir)) {
  try {
    fs.mkdirSync(imagesDir, { recursive: true });
  } catch (err) {
    // If creation fails, let multer report errors later
    console.error("Could not create images directory:", err.message);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, imagesDir);
  },
  filename: (req, file, callback) => {
    // sanitize original name, remove spaces and unsafe chars
    const rawName = (file.originalname || "").split(".").slice(0, -1).join(".");
    const safeName = rawName.split(" ").join("_").replace(/[^a-zA-Z0-9_\-\.]/g, "");
    const extension = MIME_TYPES[file && file.mimetype];
    if (!extension) {
      return callback(new Error("Invalid file type"));
    }
    const filename = `${safeName || 'file'}_${Date.now()}.${extension}`;
    callback(null, filename);
  },
});

module.exports = multer({ storage: storage }).single("image");
