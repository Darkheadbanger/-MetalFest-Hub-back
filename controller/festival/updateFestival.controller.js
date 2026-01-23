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
      .filter((bands) => bands.trim());
  }

  // optional image
  if (req.file) {
    updateData.image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }

  if(Object.keys(updateData).length === 0){
    return res.status(400).json({errorMessage: "Can't update with an empty object"})
  }

  try {
      // Coerce types
      if (Object.prototype.hasOwnProperty.call(updateData, "price")) {
        const priceNum = Number(updateData.price);
        if (Number.isNaN(priceNum)) {
          return res.status(400).json({ errorMessage: "price must be a number" });
        }
        updateData.price = priceNum;
      }

      if (Object.prototype.hasOwnProperty.call(updateData, "festivalDate")) {
        const date = new Date(updateData.festivalDate);
        if (isNaN(date.getTime())) {
          return res.status(400).json({ errorMessage: "festivalDate must be a valid date" });
        }
        updateData.festivalDate = date;
      }

      // Check unique festivalName (prevent duplicate key on update)
      if (updateData.festivalName) {
        const existing = await Festival.findOne({ festivalName: updateData.festivalName }).lean();
        if (existing && existing._id.toString() !== id) {
          return res.status(409).json({ messageError: "A festival with that name already exists" });
        }
      }

      const updated = await Festival.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
        context: "query",
      }).select("-_id -__v").lean();

      if (!updated) {
        return res.status(404).json({ messageError: "Festival not found" });
      }

      return res.status(200).json({ messageSuccess: "Festival updated", festival: updated });
  } catch (error) {
      // handle duplicate-key just in case
      if (error && error.code === 11000) {
        return res.status(409).json({ messageError: "Duplicate key error" });
      }
      return next(error);
  }
};

module.exports = { updateFestival };
