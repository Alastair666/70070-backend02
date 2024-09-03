import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import fileStore from "session-file-store"
import MongoStore from "connect-mongo"

const fileStorage = FileStore(session)

const app = express()
const PORT = 8080

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://alastairblackwell:3lLd35UcActsfMLZ@cluster0.hprwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        mongoOptions:{},
        ttl: 15
    }),
    secret: "abc1234",
    resave: false,
    saveUninitialized: false
}))




app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})