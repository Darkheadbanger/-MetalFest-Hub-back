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

// Read
router.get("/festivals", getAllFestival);

// Read one festival
router.get(`/festivals/:id`, getOneFestival);
// Update
router.put(`/festivals/:id`, updateFestival);
// delete
router.delete(`/festivals/:id`, deleteFestival);

module.exports = router;
