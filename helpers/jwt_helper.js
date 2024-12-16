const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const { expression } = require('joi')

module.exports = {
    signAccessToken: (userId) =>{
        return new Promise((resolve, reject) => {
            const payload ={}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const option ={
                expiresIn: "1h",
                issuer:"adam.com",
                audience: userId
            }
            JWT.sign(payload, secret, option, (err,token)=>{
                return err ? reject(err) : resolve(token)
            })
        })
    }
}