import { Router } from 'express';
import User from '../../models/user.js';
import { createHash, isValidPassword } from '../../utils.js';
import passport from 'passport';

const router = Router();

// PRACTICA DE PASSPORT
router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }),
async (req, res)=>{
    res.send({status: "success", message: "Usuario registrado"})
})

router.get('/failregister', async(req,res)=>{
    console.log('Estrategia fallida')
    res.send({error: "Failed"})
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}),
async (req,res)=>{
    if (!req.user) return res.status(400).send({ status: "error", error: "Credenciales Invalidas como Clarita" })
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.send({ status: "success", payload: req.user })
})

router.get('/faillogin', async(req,res)=>{
    res.send("Login fallido")
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
})

// PRACTICA DE BYCRYPT
/*router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = new User({ first_name, last_name, email, age, password });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) return res.status(404).send('Usuario no encontrado');
        req.session.user = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
        };
        console.log(req.session.user)
        res.redirect('/profile');

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});//*/


// PRACTICA DE GITHUB
/*router.get("/github", passport.authenticate("github", { scope:["user:email"]}), async(req,res)=>{})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), async(req,res)=>{
    req.session.user = req.user
    res.redirect("/")
})//*/

export default router;
