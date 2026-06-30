import { verfiyToken } from "../utils/jwt.js";
import User from "../model/User.js";

export const protect = async (req,res,next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route",
            })
        }
        try {
            const decodedToken = verfiyToken(token)
            req.user = await User.findById(decodedToken.id)
            next()
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route",
            })
        }
    } catch (error) {       
        next(error)
    }
    
}