import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router();

// PRACTICA DE PASSPORT
router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');
});

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { user: req.session.user });
});//*/

// PRACTICA DE GITHUB
/*router.get("/", async(req,res)=>{
    res.render("profile")
})

router.get("/login", async(req,res)=>{
    res.render("login")
})//*/

export default router;
