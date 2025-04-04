const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup API
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!["customer", "vendor"].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Only customer or vendor allowed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Signup failed" });
  }
};

// Login API
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        //console.log("Stored Hashed Password:", user.password); // Debugging
        //console.log("User Input Password:", password); // Debugging

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Password does not match!");
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Check if JWT_SECRET is properly loaded
        if (!process.env.JWT_SECRET) {
            console.error("ERROR: JWT_SECRET is missing in .env file!");
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //console.log("Login Successful, Token Generated!");
        res.status(200).json({ token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Login failed" });
    }
};