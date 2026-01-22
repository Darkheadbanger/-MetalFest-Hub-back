const router = require("express").Router();
const Festival = require("../models/Festival.model.js");
const { query, validationResult, body } = require("express-validator");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const mongoose = require("mongoose");

// Create
router.post(
  "/",
  [
    body("festivalName")
      .notEmpty()
      .withMessage("Le nom du festival est equis.")
      .escape(),
    body("festivalDate")
      .notEmpty()
      .withMessage("La date est requise.")
      .escape(),
    body("festivalLocation")
      .notEmpty()
      .withMessage("La location du festival est requis")
      .escape(),
  ],
  isAuthenticated,
  // body, // supprimé car inutile et non défini
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errorMessage: errors.array() });
    }
    const festivalData = { ...req.body, createdBy: req.payload_id };
    Festival.create(festivalData)
      .then((festival) => {
        if (!festival) {
          res
            .status(400)
            .json({ messageError: "La requête de festival n'est pas bonne" });
        }
        console.log("New festival created", festival);
        res
          .status(201)
          .json({ messageSuccess: "The festival is created", festival });
      })
      .catch((error) => {
        next(error);
      });
  },
);

// Read
// Update
// delete

module.exports = router;
