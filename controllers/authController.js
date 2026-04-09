const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

const createNewAccount = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Frontend se 'name' hi aayega

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required to sign up" });
  }

  const emailKey = email.toLowerCase();
  const accountExists = await User.findOne({ email: emailKey });

  if (accountExists) {
    return res.status(400).json({ message: "This email is already registered" });
  }

  const saltValue = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(password, saltValue);

  const newUser = await User.create({
    username: name, // Model field 'username' use kiya
    email: emailKey,
    password: securedPassword
  });

  res.status(201).json({
    message: "New account created successfully",
    token: generateToken(newUser._id),
    user: {
      id: newUser._id,
      name: newUser.username, // username return kiya
      email: newUser.email
    }
  });
});

const authenticateMember = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const member = await User.findOne({ email: email.toLowerCase() });

  if (!member) {
    return res.status(401).json({ message: "No account found with this email" });
  }

  const isPasswordValid = await bcrypt.compare(password, member.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect login details" });
  }

  res.json({
    message: "Welcome back! Login successful",
    token: generateToken(member._id),
    user: {
      id: member._id,
      name: member.username, // 'name' ki jagah 'username'
      email: member.email
    }
  });
});

module.exports = { createNewAccount, authenticateMember };