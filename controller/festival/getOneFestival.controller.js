const Festival = require("../../models/Festival.model");
const mongoose = require("mongoose");

const getOneFestival = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ messageError: "Invalid festival id format" });
  }

  try {
    const festival = await Festival.findById(id).lean().select("-_id -__v");
    if (!festival) {
      return res.status(404).json({ messageError: "Festival not found" });
    }
    return res.status(200).json({ festival: festival });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getOneFestival };
