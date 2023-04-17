const express = require('express')
const app = express()
const db = require('./config/db')
const cors = require('cors')
const userController = require('./controllers/userController')
const dotenv = require('dotenv')
const jwt = require('./middlewares/jwt')
dotenv.config()

app.use(cors())
app.use(express.json()) 
db.connectDB();

app.post('/signup',userController.signup)

app.post('/login',userController.login)

app.get('/all-products', userController.getAllProducts)

app.post('/add-product',jwt.jwt, userController.addProduct)

app.post('/edit-product', jwt.jwt, userController.updateProduct)

app.post('/delete-product', userController.deleteProduct)



app.listen(4000,()=>{
    console.log("Server started at port 4000")
})