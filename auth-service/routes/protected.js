const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/users");
const router = express.Router();

router.get("/protected", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "Protected route accessed",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error fetching user data: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;