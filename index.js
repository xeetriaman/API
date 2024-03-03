import express from "express"
import {config} from "dotenv"
import routes from "./routes/index.js"
import mongoose from "mongoose";
import parser from "body-parser"

config();
const app= express()
app.use(express.json())
app.use(parser.urlencoded())

app.use(routes)
app.use((err,req,res,next) => {
console.log(err)
res.status(err.status|| 400)
.json({
    error:err.message || 'There seems to be problem'
})
})
app.listen(process.env.API_PORT, process.env.API_HOST ,async () => {
    console.log(`Server started at http://${process.env.API_HOST}:${process.env.API_PORT}`)
    console.log('Press Ctrl+C to stop')
    await mongoose.connect(process.env.MONGO_ADDR)
    console.log('MongoDb Connected')
})