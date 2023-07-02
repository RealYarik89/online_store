require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const app = express()
const models = require('./models/models')
const cors = require("cors")
const PORT = process.env.PORT || 5000
const router = require("./routes/index")
const fileUpload = require("express-fileupload")
const errorHandler = require("./middleware/errorHandlingMiddleware")
const path = require("path")

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname,"static")))
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