const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        unique: true
    }
})

UserSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        //generate username
        if(!this.username){
            this.username = this.email.split('@')[0]
        }

        next()
    }catch(error){
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password)
    }catch(error){
        throw error
    }
}

const User = mongoose.model('user', UserSchema)
module.exports = User