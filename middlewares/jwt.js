const jwt = require('jsonwebtoken') 


module.exports.jwt  = function (req,res,  next){
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET,(err, data)=>{
            if(err){
                res.status(401).send({ message: "You are not authorized" })
            }else{
                next();
            }
        })
    } catch (error) {
        res.status(401).send({message: "You are not authorized"})
    }
}