const Festival = require("../../models/Festival.model");

getAllFestival = (req, res, next) => {
  Festival.find()
    .lean()
    .select("-_id -__v")
    .then((festivals) => {
      if (!festivals || festivals.length === 0) {
        res.status(404).json({
          messageError: "The festival is empty",
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
