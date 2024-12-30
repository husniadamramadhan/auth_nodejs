const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const { expression } = require('joi')
const client = require('./init_redis')

module.exports = {
    signAccessToken: (userId) =>{
        return new Promise((resolve, reject) => {
            const payload ={}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const option ={
                expiresIn: "1d",
                issuer:"adam.com",
                audience: userId
            }
            JWT.sign(payload, secret, option, (err,token)=>{
                if (err){
                    console.log(err.message)
                    reject (createError.InternalServerError())
                }
                resolve (token)
            })
        })
    },
    verifyAccessToken: (req,res,next)=>{
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,payload)=>{
            if (err){
                //if (err.name === 'JsonWebTokenError'){
                //    return next(createError.Unauthorized())
                //}else {
                //    return next(createError.Unauthorized(err.message))
                //}
                const message = 
                err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError(message))
            }
            req.payload = payload
            next()
        })
    },
    signRefreshToken: async (userId) => {
        const payload = {}
        const secret = process.env.REFRESH_TOKEN_SECRET
        const option = {
            expiresIn: "1m",
            issuer: "adam.com",
            audience: userId
        }

        try {
            const token = await new Promise((resolve, reject) => {
                JWT.sign(payload, secret, option, (err, token) => {
                    if (err) {
                        console.error("JWT Sign Error", err.message)
                        return reject(createError.InternalServerError())
                    }
                    resolve(token)
                })
            })

            console.log("JWT Token Generated:", token)

            // Menyimpan token di Redis dengan async/await
            const expireTimeInSeconds = 60 * 60 * 24 * 30
            await client.setEx(userId, expireTimeInSeconds,token)
            console.log("Token stored in Redis")

            return token
        } catch (error) {
            console.error("Error signing refresh token or storing in Redis:", error.message)
            throw createError.InternalServerError()
        }
    },
    verifyRefreshToken: async (refreshToken) => {
        console.log("Starting verification for refresh token...");
        try {
            // Verifikasi JWT refresh token
            const payload = await new Promise((resolve, reject) => {
                JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        console.log("JWT verification failed:", err.message);
                        // Menangani error spesifik berdasarkan nama error
                        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                        // Menangani jika token kadaluwarsa atau error lainnya
                        return reject(new Error(message)); // Use the standard Error object
                    }
                    resolve(decoded);
                });
            });
    
            const userId = payload.aud;
            console.log("Verifying token from Redis...");
    
            // Menggunakan await pada client.get yang sudah berbasis Promise
            const result = await client.get(userId);
            if (!result) {
                console.log(`Token not found for userId: ${userId}`);
                throw new Error("Unauthorized: Token not found");
            }
    
            if (refreshToken === result) {
                console.log("Token matched successfully.");
                return userId;  // Mengembalikan userId jika token cocok
            }
    
            console.log("Token mismatch.");
            throw new Error("Unauthorized");  // Menolak jika token tidak cocok
        } catch (err) {
            console.log("Error during token verification:", err.message);
            throw err;  // Menangani error yang terjadi
        }
    }
                
}