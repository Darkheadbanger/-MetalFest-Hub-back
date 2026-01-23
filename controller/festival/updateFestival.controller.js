const Festival = require("../../models/Festival.model");
const mongoose = require("mongoose");

const updateFestival = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ messageError: "Invalid festival id format" });
  }

  // accept form-data with festival (string) OR JSON body
  let payload = {};
  try {
    if (req.body && req.body.festival) {
      payload = JSON.parse(req.body.festival);
    } else {
      payload = { ...req.body };
    }
  } catch (err) {
    return res.status(400).json({ errorMessage: "Malformed JSON in festival" });
  }

  // whitelist fields allowed to be updated (partial updates supported)
  const allowed = [
    "festivalName",
    "festivalUrl",
    "festivalLocation",
    "festivalDate",
    "price",
    "featureBands",
    "description",
  ];
  const updateData = {};
  for (const key of allowed)
    if (payload[key] !== undefined) {
      updateData[key] = payload[key];
    }

  // normalize featureBands
  if (updateData.featureBands && !Array.isArray(updateData.featureBands)) {
    updateData.featureBands = String(updateData.featureBands)
      .split(",")
      .map((bands) => bands.trim())
      .filter(Boolean);
  }

  // optional image
  if (req.file) {
    updateData.image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }

  try {
    const updated = await Festival.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    }).select("-_id -__v");
    delete updated.toObject()._id;
    delete updated.toObject().__v;
    if (!updated) {
      return res.status(404).json({ messageError: "Festival not found" });
    }
    return res
      .status(200)
      .json({ messageSuccess: "Festival updated", festival: updated });
  } catch (error) {
    return next(error);
  }
};

module.exports = { updateFestival };
