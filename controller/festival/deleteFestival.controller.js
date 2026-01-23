const Festival = require("../../models/Festival.model");
const mongoose = require("mongoose");

const deleteFestival = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ messageError: "Invalid festival id format" });
  }

  try {
    const deleted = await Festival.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ messageSuccess: "Festival deleted", festival: deleted });
  } catch (error) {
    return next(error);
  }
};

module.exports = { deleteFestival };
