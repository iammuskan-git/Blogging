require('dotenv').config();
const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = models;

exports.signup = (req,res) => {
    User.findOne({ where: { email:req.body.email}}).then(result =>{
        if(result){
            res.status(409).json({
                message: "Email Already Exists!!!",
                email: result.email
            })
        }else{
            const users = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 11),
            }
            User.create(users).then(result => {
                res.status(200).json({
                    message: "User created successfully!!!",
                    result: result
                })
            }).catch(error =>{
                res.status(500).json({
                    message: "Something went wrong"
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
        message: "Something went wrong!!!"       
    })
  })
}


exports.login= (req,res) => {
    User.findOne({where: { email: req.body.email }}).then(user =>{
        if(user === null){
            res.status(401).json({
                message: "Invalid email credientials!!!"
            })
        }else{
            bcrypt.compare(req.body.password,user.password,function(error, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.ACCESS_TOKEN_SECRET, function(error, token){
                        res.status(200).json({
                            message: "Authentication sucessfull!!!",
                            token: token
                        })                       
                    })
                }else{
                    res.status(401).json({
                        message: "Invalid password credientials!!!"
                    })
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!!"
        })       
    })
}