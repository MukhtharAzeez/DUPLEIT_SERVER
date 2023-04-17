const user = require('../models/userSchema')
const product = require('../models/productSchema')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

module.exports = {
    signup: async function (req, res) {
        console.log(req.body)
        try {
            let userCheck = await user.findOne({ email: req.body.email })
            if (userCheck) {
                res.status(400).send({ message: "This email is already registered" })
            } else {
                const newUser = user(req.body)
                await newUser.save()
                res.status(200).send({message:signedup})
            }
        } catch (error) {
            console.log(error)
        }
    },
    login: async function (req, res) {
        try {
            let userCheck = await user.findOne({ email: req.body.email, password: req.body.password })
            if (userCheck) {
                const accessToken = await jwt.sign({ _id: userCheck._id,email: req.body.email }, process.env.SECRET, {
                    expiresIn: '1d'
                })
                res.status(200).send({ token: accessToken ,userId: userCheck._id})
            } else {
                res.status(400).send({ message: "Make sure you entered credentials is correct" })
            }
        } catch (error) {
            console.log(error)
        }
    },
    getAllProducts: async function (req, res) {
        try {
            let products = await product.find({})
            res.status(200).send(products)
        } catch (error) {
            console.log(error)
        }
    },
    addProduct: async function (req, res) {
        try {
            const newProduct = product(req.body)
            await newProduct.save()
            res.status(200).send({message:"product added"})
        } catch (error) {
            console.log(error)
        }
    },
    updateProduct: async function (req, res) {
        console.log(req.body)
        try {
            await product.updateOne({ _id: new mongoose.Types.ObjectId(req.body.productId)},{
                $set: {
                    name: req.body.name,
                    price: req.body.price
                }
            })
            res.status(200).send({message:"Product Updated"})
        } catch (error) {
            console.log(error)
        }
    },
    deleteProduct: async function (req, res) {
        try {
            await product.deleteOne({ _id: new mongoose.Types.ObjectId(req.body.productId) })
            res.status(200).send({message:"success"})
        } catch (error) {
            res.status(400).send({ message: "something happens wrong" })
            console.log(error)
        }
    }
}