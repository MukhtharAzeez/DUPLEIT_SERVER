const mongoose = require('mongoose')

module.exports.connectDB = async ()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/duple",{
            useUnifiedTopology: true
        })
        console.log("database connected")
    } catch (error) {
        console.log("error while connecting")
    }
}