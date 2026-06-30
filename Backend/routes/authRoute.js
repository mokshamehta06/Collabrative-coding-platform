import express from 'express'
import {body,validationResult} from 'express-validator'
import { register } from '../controllers/authController.js'
import { login } from '../controllers/authController.js'
import { getMe } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

const handleValidationError = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:errors.array()[0].msg,
        })
    }
    next()
}
router.post(
    '/register',[
        body('name')
        .trim()
        .isLength({min:3})
        .withMessage('Name must be atleast 3 characters long'),
        body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email is not valid'),
        body('password')
        .trim()
        .isLength({min:6})
        .withMessage('Password must be atleast 6 characters long')
    ],
    handleValidationError,
    register
)
router.post(
    '/login',[
        body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email is not valid'),
        body('password')
        .trim()
        .isLength({min:6})
        .withMessage('Password must be atleast 6 characters long')
    ],
    handleValidationError,
    login
)

router.get('/me',protect,getMe)
export default router