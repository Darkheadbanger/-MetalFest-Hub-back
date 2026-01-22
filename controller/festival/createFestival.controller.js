const Festival = require("../../models/Festival.model");

createFestival = (req, res, next) => {
  let thingFestivalObject;
  try {
    thingFestivalObject = JSON.parse(req.body.festival);
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
  const missing = requiredFields.filter((field) => !thingFestivalObject[field]);
  if (missing.length > 0) {
    return res
      .status(400)
      .json({ errorMessage: `Missing fields: ${missing.join(", ")}` });
  }

  delete thingFestivalObject._id;
  const festivalData = {
    ...thingFestivalObject,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    createdBy: req.payload_id,
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
