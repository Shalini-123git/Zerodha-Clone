import User from '../models/userModel.js';

import { createSecretToken } from '../util/secretToken.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loggedInUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not logged in"
            });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const user = await User.findById(decoded.id).select("-password");
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

export const signupController = async (req, res, next) => {
    try{
        const {email, password, username} = req.body;
        const exixtsingUser = await User.findOne({email});
        if(exixtsingUser) {
            return res.json({message: "User already exists"});
        }
        const user = await User.create({ email, password, username});
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredential: true,
            httpOnly: false,
        });
        res.status(201).json({
            message: "User signed up successfully",
            success: true, 
            user
        });
        console.log(user);
    }catch (error){
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({
                message: "All fields are required"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                message: "User not exist, Please signup for continue"
            })
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            return res.json({
                message: "Incorrect password or email"
            })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredential: true,
            httpOnly: false,
        });
        res.status(201).json({
            message: "User logged in successfully",
            success: true,
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}
