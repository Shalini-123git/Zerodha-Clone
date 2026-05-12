import User from '../models/userModel.js';

import { createSecretToken } from '../util/secretToken.js';
import bcrypt from 'bcryptjs';

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
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}
