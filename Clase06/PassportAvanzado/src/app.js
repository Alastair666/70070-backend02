import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/api/sessions.js';
import viewsRouter from './routes/views.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

const app = express();

const PORT = 8080

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);


app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://climon:psswrd24TECTOS@cluster0.nf6kn.mongodb.net/' }),
    // cookie: { maxAge: 180 * 60 * 1000 },
}));
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
