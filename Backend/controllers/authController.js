import User from "../model/User.js";
import { genrateToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Generate JWT Token
        const token = genrateToken(user._id);

        // Send response
        return res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token,
            },
        });

    } catch (error) {
        next(error);
    }
};



export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email }).select('+password');

        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't  Exists",
            });
        }
        //check if password match
        const isPasswordMatch = await userExists.matchPassword(password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Password Does't Match",
            });
        }
        // Generate JWT Token
        const token = genrateToken(userExists._id);

        // Send response
        return res.status(201).json({
            success: true,
            data: {
                user: {
                    id: userExists._id,
                    name: userExists.name,
                    email: userExists.email,
                },
                token,
            },
        });

    } catch (error) {
        next(error);
    }
};

export const getMe = async (req,res,next) => {
    try {
        const user = await User.findById(req.user._id) 
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }  
        return res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            message:"User get Successfully"
        });
    } catch (error) {
        next(error)
    }
}