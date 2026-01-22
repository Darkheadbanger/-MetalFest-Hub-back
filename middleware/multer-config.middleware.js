const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // sanitize original name, remove spaces and unsafe chars
    const rawName = file.originalname.split(".").slice(0, -1).join(".");
    const safeName = rawName.split(" ").join("_").replace(/[^a-zA-Z0-9_\-\.]/g, "");
    const extension = MIME_TYPES[file.mimetype];
    if (!extension) {
      return callback(new Error("Invalid file type"));
    }
    const filename = `${safeName}_${Date.now()}.${extension}`;
    callback(null, filename);
  },
});

module.exports = multer({ storage: storage }).single("image");
