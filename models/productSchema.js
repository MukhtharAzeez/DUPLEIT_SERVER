const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const product = mongoose.model("productSchema", productSchema)
module.exports = product
