require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const app = express()
const models = require('./models/models')
const cors = require("cors")
const PORT = process.env.PORT || 5000
const router = require("./routes/index")
const errorHandler = require("./middleware/errorHandlingMiddleware")

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.use(errorHandler)

app.get("/", (req, res) => {
    res.status(200).json({message: "Work!!!"})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)       
    }
}

start()