const { Schema, model } = require("mongoose");

const festivalSchema = new Schema(
  {
    festivalName: {
      type: String,
      required: [true, "The title of your festival is required"],
      unique: true,
      trim: true,
    },
    // festivalUrl: {
    //   type: String,
    //   trim: true,
    //   trim: true,
    // },
    festivalLocation: {
      type: String,
      required: [
        true,
        "You must put the location of the festival, if it's not known, please put TBA",
      ],
      trim: true,
    },
    festivalDate: {
      type: Date,
      required: [true, "You must put the date"],
    },
    price: {
      type: Number,
      required: [true, "Put the price please"],
    },
    featureBands: {
      type: [String],
      required: [true, "Please put the name of the bands"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = model("Festival", festivalSchema);
