const jwtoken = require('jsonwebtoken')
const { fn } = require('sequelize')

module.exports = function (role) {

    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: "Пользователь не авторизован!" })
            }
            const decode = jwtoken.verify(token, process.env.SECRET_KEY)
            if (decode.role !== role){
                return res.status(403).json({ message: "Нет доступа!" })    
            }
            req.user = decode
            next()
        } catch (e) {
            return res.status(401).json({ message: "Пользователь не авторизован!" })
        }
    }
}
