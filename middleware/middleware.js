const jwt = require('jsonwebtoken');
const User = require('../Models/User.js')

const middleware  = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({succes: false, message: "unauthorized"})
        }
        const decoded = jwt.verify(token,"546979")

        if(!decoded){
             return res.status(401).json({succes: false, message: "wrong token"})
        }

        const user = await User.findById({_id: decoded.id})

        if(!user){
             return res.status(401).json({succes: false, message: "user not found"})


        }
        const newUser = {name:user.name, id: user._id}
        req.user = newUser
        next()
    } catch (error) {
        return res.status(500).json("error")
    }
}

module.exports = middleware