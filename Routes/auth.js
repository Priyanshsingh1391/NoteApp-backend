const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/middleware.js')

const bcrypt = require('bcrypt');


router.post('/register', async(req,res)=>{
try {
    const {name, email, password} = req.body
    const user = await User.findOne({email})

    if(user){
        return res.status(401).json({sucess: false , message: "user already exist"})
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name, email, password:hashPassword
    })
    
    await newUser.save();
    return res.status(200).json({success: true, message: "Account created succesfully"})

} catch (error) {
     return res.status(500).json({success: false, message: "Server Error"})
}
})

router.post('/login', async(req,res)=>{
try {
    const {name, email, password} = req.body
    const user = await User.findOne({email})

    if(!user){
        return res.status(401).json({sucess: false , message: "user does not exist"})
    }

    const checkpassword = await bcrypt.compare(password, user.password)

    if(!checkpassword){
        return res.status(401).json({sucess: false , message: "wrong password"})
    }

    const token = jwt.sign({id: user._id}, "546979")
    

    
    return res.status(200).json({success: true,token,user:{name:user.name}, message: "Login succesfully"})

} catch (error) {
     return res.status(500).json({success: false, message: "Server Error"})
}
})

router.get('/verify',middleware, async (req, res)=> {
    return res.status(200).json({success: true,user: req.user})
})


module.exports = router;
