require("dotenv").config()
const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwtoken = require("jsonwebtoken")
const {User, Basket} = require("../models/models")

class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest("Некорректный email или пароль!"))
        }
        const condidate = await User.findOne({where: {email}})
        if (condidate){
            return next(ApiError.badRequest("Пользователь с таким email уже существует!"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, role})
        const basket = await Basket.create({userId: user.id})
        const token = jwtoken.sign({id: user.id, email, role}, process.env.SECRET_KEY, {expiresIn: "24h"})
        return res.json({token})
    }

    async login(req, res){

    }

    async check(req, res, next){
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest("Не задан id"))
        }
        res.json(id)
    }
}

module.exports = new UserController()