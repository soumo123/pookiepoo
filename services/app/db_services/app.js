import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import fetchRoutes from './src/routes/userRoutes.js'
import fetchquesRoutes from './src/routes/question.routes.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))


//Routes///
app.use("/fetchdb",fetchRoutes)
app.use("/fetchdb",fetchquesRoutes)

export default app


