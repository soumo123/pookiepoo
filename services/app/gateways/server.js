import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import fetchQuesRoutes from './src/routes/question.routes.js'
import userRoutes from './src/routes/users.routes.js'
dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/v1",fetchQuesRoutes)
app.use("/api/v1",userRoutes)

app.listen(PORT, () => {
    console.log("Gateway Server is running on 8001")
})