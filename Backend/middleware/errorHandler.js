const errorHandler = (err,req,res,next)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error'
    
    //mongooes validation error
    if(err.name ==='ValidationError'){
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message);
    }
    //mongooes duplicate key error
    if(err.code === 11000){
        statusCode = 400;
        message = 'Resource already exist'
    }
    if(err.name === 'JsonWebTokenError'){
        statusCode = 401;
        message = 'Invalid Token'
    }
    if(err.name === 'TokenExpiredError'){
        statusCode = 401;
        message = 'Token Expired'
    }
    
    console.log('Error ',err);
    res.status(statusCode).json({
        success: false,
        message,
    })
}
export default errorHandler