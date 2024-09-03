import express from 'express';
import { generateToken } from "./utils.js"

const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = []

app.post("/register", (req,res)=>{
    const { name, email, password} = req.body
    const exists = users.find(user=> user.email === email)
    if (exists) {
        res.status(400),send({error: "Usuario ya registrado"})
    }

    const user = {
        name,
        email,
        password
    }
    users.push(user)

    const access_token = generateToken(user)
    res.status(201).send({access_token})
})

app.post("/login", (req, res)=>{
    const { email, password } = req.body
    const user = users.find(user=> user.email === email)
    if (!user) return res.status(400).send({error: "Usuario no encontrado"})
        const access_token = generateToken(user)
    res.status(200).send({access_token})
    console.log(users)
})

app.get("/current", authToken, (req,res)=>{
    res.send({status: "success", payload: req.user})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
})