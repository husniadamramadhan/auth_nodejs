const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User=require('../Models/User.model')
const {verifyAccessToken} = require('../helpers/jwt_helper')


router.get('/profile', verifyAccessToken, async(req,res,next)=>{
    try{
        const UserId = req.payload.aud
        const user = await User.findById(UserId)
        if(!user) throw createError.NotFound()
        res.json({username:user.username,email:user.email})
    }catch (err) {
        next(err)
    }
})
module.exports = router