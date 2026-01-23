const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const multer = require("../middleware/multer-config.middleware.js");

const {
  createFestival,
} = require("../controller/festival/createFestival.controller.js");

const {
  getAllFestival,
} = require("../controller/festival/getAllFestival.controller.js");

const {
  getOneFestival,
} = require("../controller/festival/getOneFestival.controller.js");

const {
  updateFestival,
} = require("../controller/festival/updateFestival.controller.js");

const {
  deleteFestival,
} = require("../controller/festival/deleteFestival.controller.js");
// Create
router.post("/", isAuthenticated, multer, createFestival);

// Read all
router.get("/", getAllFestival);

// Read one
router.get("/:id", getOneFestival);

// Update (replace)
router.put("/:id", isAuthenticated, multer, updateFestival);

// Delete
router.delete("/:id", isAuthenticated, deleteFestival);

module.exports = router;
