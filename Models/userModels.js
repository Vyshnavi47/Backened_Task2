const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please provide first name"]
    },
    lastName:{
        type:String,
        required:[true,"Please provide last name"]
    },
    username:{
        type:String,
        required:[true,"Please provide the username"],
    },
    email:{
        type:String,
        required:[true,"Please provide the email"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Please provide the password"],
    },
    phone:{
        type:String,
        required:[true,"Please provide the phone number"],
    },
    gender:{
        type:String,
        required:[true,"Please provide the gender"],
        enum:["male","female"]
    },
    dateOfBirth:{
        type:String,
        required:[true,"Please provide the date of birth"],
    },
    Image:{
        type:String,
        required:[true,"Please provide the date of birth"],
    },
    File:{
        type:String,
        required:[true,"Please provide the date of birth"],
    },
    Subscribe:{
        type:String,
        required:[true,"Subscribe"],
        enum:["yes","no"]
    },
    
},{
    timestamps:true,
})
module.exports = mongoose.model("User",userSchema)