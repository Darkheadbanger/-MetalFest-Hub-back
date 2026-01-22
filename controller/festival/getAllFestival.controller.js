const Festival = require("../../models/Festival.model");

getAllFestival = (req, res, next) => {
  Festival.find()
    .lean()
    .select("-_id -__v")
    .then((festivals) => {
      if (!festivals || festivals.length === 0) {
        res.status(404).json({
          messageError: "There is an error when retrieving the festivals",
        });
      } else {
        const cleanFestival = festivals.map((_id, __v, ...rest) => rest);
        res.status(200).json({ cleanFestival });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getAllFestival };
