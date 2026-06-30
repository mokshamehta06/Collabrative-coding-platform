import jwt from "jsonwebtoken"

export const genrateToken = (userId)=>{
    return jwt.sign(
        {
        id:userId},
        process.env.JWT_SECRET,
        {
            expiresIn:"10m"
        }
    )
}

export const verfiyToken = (token)=>{
    try {
        return jwt.verify(
            token,process.env.JWT_SECRET
        )
    } catch (error) {
        console.error('Token verification failed:', error);
        throw new Error('Invalid token');
    }
}


