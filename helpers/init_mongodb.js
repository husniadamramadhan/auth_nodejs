const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URI, {dbname: process.env.DB_NAME})
    .then(()=> {
        console.log('Mongodb connected.')
    })
    .catch(err=> console.log(err.message))

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnecting', ()=>{
    console.log('Mongoose connection is disconnected.')
})
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})