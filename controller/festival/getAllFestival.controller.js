const Festival = require("../../models/Festival.model");

getAllFestival = (req, res, next) => {
  Festival.find()
    .lean()
    .select("-_id -__v")
    .then((festivals) => {
      // Retourne toujours 200, même si vide
      res.status(200).json({ festivals });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getAllFestival };
