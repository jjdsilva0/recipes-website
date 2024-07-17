import express from "express"; //Node backend framework used for writing API
import jwt from "jsonwebtoken"; //Used for creating the tokens for user sessions when logged-in
import bcrypt from "bcrypt"; //Used for hashing passwords
import { UserModel } from "../models/Users.js"; // Uses this model setup as the form for async functions
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve("../../.env") });

const router = express.Router();

// Callback functions in express, like the one below - in the 2nd argument of .post - take 2 arguments themselves (req and res)
// req - used to get data from the whatever made the request from the frontend
// res - used to send the response back to the frontend through the API
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Checks if the a user with this username already exists
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Interal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User Doesn't Exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is Incorrect!" });
  }

  // A token is a means by which the server/API can verify the person making requests is the same person who was logged-in initially
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next(); // if no errors are present, then allow the user to continue to their request
    });
  } else {
    res.sendStatus(401);
  }
};
