import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 8);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    image: req.body.image,
  });

  try {
    const registerUser = await newUser.save();
    res.status(200).json(registerUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const LoginUser = await User.findOne({ username: req.body.username });

    !LoginUser && res.status(500).json("Username doesn't exist");

    const validate = await bcrypt.compare(
      req.body.password,
      LoginUser.password
    );

    !validate && res.status(500).json("Wrong credentials");

    const { password, ...others } = LoginUser._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
