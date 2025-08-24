import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { validateRegister } from "../middlewares/validateRegister.js";

const router = express.Router();

// REGISTER USER
router.post("/register", validateRegister, async (req, res) => {
  try {
    const { name, email, password, checkboxMarked } = req.body;

    // check if user already exists
    const existingUser = await User.findOne(email);
    if (existingUser) {
      return res.status(404).json({ success: false, error: "User already exists, kindly login" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully!", name: name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found, kindly register" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    // success
    return res.status(200).json({
      success: true,
      message: "Login successful",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
