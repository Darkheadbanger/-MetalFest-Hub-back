const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const multer = require("../middleware/multer-config.middleware.js");

const {
  createFestival,
} = require("../controller/festival/createFestival.controller.js");

const {
  getAllFestival,
} = require("../controller/festival/getAllFestival.controller.js");

// Create
router.post("/", isAuthenticated, multer, createFestival);

// Read
router.get("/festivals", getAllFestival);
// Update
// delete

module.exports = router;
