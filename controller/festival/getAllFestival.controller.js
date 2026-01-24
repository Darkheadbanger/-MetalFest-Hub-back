const Festival = require("../../models/Festival.model");

getAllFestival = (req, res, next) => {
  Festival.find()
    .lean()
    .select("-_id -__v")
    .then((festivals) => {
      // always get all the festival even if it's empty
      res.status(200).json({ festivals });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getAllFestival };
