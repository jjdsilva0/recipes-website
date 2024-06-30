import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; //Used for hashing passwords
import { UserModel } from '../models/Users.js';

const router = express.Router()

// Callback functions in express, like the one below - in the 2nd argument of .post - take 2 arguments themselves (req and res)
// req - used to get data from the whatever made the request from the frontend
// res - used to send the response back to the frontend through the API
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    

    try {
        // Checks if the a user with this username already exists
        const user = await UserModel.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "Username already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new UserModel({username, password: hashedPassword});
        await newUser.save();

        res.status(200).json({message: "User Registered Successfully"})
    } catch (error) {
        res.status(500).json({message: "Interal Server Error"})
    }
});



export {router as userRouter};