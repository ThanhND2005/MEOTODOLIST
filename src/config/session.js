require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const configSession = (app) =>{
    app.use(session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store : MongoStore.create({
            mongoUrl: process.env.MONGO_DB_URL,
            ttl: 1000*60*60*24*7,
        }),
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000*60*60*24*7,
        }
    }));
}

module.exports = configSession;