const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,"Email is required for creating a user"],
        trim: true,
        lowercase: true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email address"],
        unique: [true,"Email already Exists"],
    },
    name:{
        type: String,
        required: [true, "Name is required fir creating a account"]
    },
    password:{
        type: String,
        required: [true,"Password is required for creating an account"],
        minlength:[6,"password Should be contained more then 6 character"]
    }
},{
    timestamps: true
})


userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        return 
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return
})

userSchema.methods.comparePassword = async function(password){

    return await bcrypt.compare(password,this.password)
}


const userModel = mongoose.model("user", userSchema)

module.exports = userModel