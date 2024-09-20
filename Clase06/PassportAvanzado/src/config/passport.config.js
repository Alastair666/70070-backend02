import passport from "passport";
import local from 'passport-local'
import userService from '../models/user.js'
import { createHash, isValidPassword } from '../utils.js'
import jwt from "passport-jwt"

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = (req)=>{
    let token = null
    console.log(req.headers)
    if (req && req.headers){
        token = req.headers.authorization.split('')[1]
    }
    return token
}

const initializePassport=()=>{
    
    // Passport JWT
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret'
    }, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error){
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let user = await userService.findById(id)
        done(null, user)
    })

    
    /*/ Local Strategy
    passport.use("register", new localStrategy({
        passReqToCallback: true, usernameField: "email"}, async(req,username,password,done)=>{
            const {first_name, last_name, email, age} = req.body
            try {
                let user = await userService.findOne({email: username})
                if (user){
                    console.log("El Usuario existe")
                    return done(null, false)
                }

                const newUser = {
                    first_name, 
                    last_name, 
                    email, 
                    age,
                    password: createHash(password)
                }

                let result = await userService.create(newUser)
                return done(null, result)

            } catch (error) {
                return done("Error al obtener el usuario:" + error)
            }
        }
    ))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let user = await userService.findById(id)
        done(null, user)
    })

    passport.use("login", new localStrategy({usernameField: "email"}, async(username, password, done)=>{
        try {
            const user = await userService.findOne({email: username})
            if (!user){
                console.log("El usuario no existe")
                return done(null, false)
            }
            if (!isValidPassword(user, password)) return done(null, false)
                return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))//*/

    /*/ AUTH with GitHub
    passport.use("github", new GitHubStrategy({
        clientID:"Iv23li01wrvO4JyyTWxE",
        clientSecret:"de895380e334e9be9e5a8f7fce192a05c8b4ffa5",
        callbacakURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile)
            let user = await userService.findOne({email: profile._json.email})
            if (!user){
                let newUser={
                    first_name: profile._json.first_name,
                    last_name: "",
                    age: 20,
                    email: profile._json.email,
                    password: ""
                }
                let user = await userService.create(newUser)
                done(null, result)
            }
            else {
                done(null, result)
            }
        }
        catch {

        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userService.findById(id)
        done(null, user)
    })//*/
}

export default initializePassport