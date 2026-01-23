const Festival = require("../../models/Festival.model");

createFestival = (req, res, next) => {
  let festivalObject;
  try {
    festivalObject = JSON.parse(req.body.festival);
  } catch (e) {
    return res.status(400).json({ errorMessage: "Malformed JSON in festival" });
  }

  // Validation manuelle des champs requis
  const requiredFields = [
    "festivalName",
    "festivalDate",
    "festivalLocation",
    "price",
    "featureBands",
    "description",
  ];
  const missing = requiredFields.filter((field) => !festivalObject[field]);
  if (missing.length > 0) {
    return res
      .status(400)
      .json({ errorMessage: `Missing fields: ${missing.join(", ")}` });
  }

  if (!req.file) {
    return res.status(400).json({ errorMessage: "Image file is required" });
  }

  delete festivalObject._id;
  const festivalData = {
    ...festivalObject,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    createdBy: req.payload && req.payload._id ? req.payload._id : undefined,
  };
  Festival.create(festivalData)
    .then((festival) => {
      if (!festival) {
        return res
          .status(400)
          .json({ messageError: "La requête de festival n'est pas bonne" });
      }
      res
        .status(201)
        .json({ messageSuccess: "The festival is created", festival });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { createFestival };
