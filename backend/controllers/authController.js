const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      name,
      email,
      password: hashed,
    });

    return res.status(201).json({ message: "Registered successfully", user: newuser });
  } catch (error) {
    console.log("REGISTER ERROR ❌", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "No such user found, sign up first" });
    }

    const matchpassword = await bcrypt.compare(password, existingUser.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR ❌", error);
    return res.status(500).json({ message: error.message });
  }
};
