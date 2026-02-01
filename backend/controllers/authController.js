const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.register = async (req,res) =>{
try{
    const {name,email,password} = req.body;
    const hashed =  await bcrypt.hash(password,10);
    const newuser =  await User.create({
        name,
        email,
        password:hashed
    })
    res.json(newuser)
}
catch(error){
    res.status(500).json(err.message);
}
}

exports.login = async (req,res) =>{
    try{
        const {email , password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser)
            return res.status(400).json("No such user Found , Sign in First ")
    const matchpassword = await bcrypt.compare(password,existingUser.password)
    if(!matchpassword) return res.status(400).json("Password dont match")

        const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    }
    catch(error){
        res.status(500).json(err.message)
    }
}