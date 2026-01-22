const router = require("express").Router();
const { body } = require("express-validator");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const multer = require("../middleware/multer-config.middleware.js");

const {
  createFestival,
} = require("../controller/festival/createFestival.controller.js");
const validationCreateFestival = [
  body("festivalName")
    .notEmpty()
    .withMessage("Le nom du festival est equis.")
    .escape(),
  body("festivalDate").notEmpty().withMessage("La date est requise.").escape(),
  body("festivalLocation")
    .notEmpty()
    .withMessage("La location du festival est requis")
    .escape(),
];
// Create
router.post(
  "/",
  validationCreateFestival,
  multer,
  isAuthenticated,
  createFestival,
);

// Read
// Update
// delete

module.exports = router;
