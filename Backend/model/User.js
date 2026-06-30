import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please Provide a name'],
        trim:true,
        maxlength:[50,'Name cannot be more than 50 char']
    },
    email: {
    type: String,
    required: [true, "Please Provide email"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
        validator: validator.isEmail,
        message: "Please Enter a valid email address",
    },
},
    password: {
        type: String,
        required: [true,'Please Provide Password'],
        minlength:[6,'Password must be atleast 6 characters long'],
        select: false
    }
}, {timestamps:true})

//hash the password before savving in db

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

//method for comparing passwords

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',UserSchema)

export default User