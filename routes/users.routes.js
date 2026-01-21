const router = require("express").Router();
const User = require("../models/User.model.js");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const mongoose = require("mongoose");

router.get("/users/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  // Vérifie si l'id est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ messageError: "Invalid user id format" });
  }
  try {
    const foundUserById = await User.findById(id).select("-password");
    if (!foundUserById) {
      return res.status(404).json({ messageError: "User not found" });
    }
    res.status(200).json(foundUserById);
  } catch (error) {
    next(err);
  }
});
module.exports = router;
