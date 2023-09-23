require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ejs = require('ejs');
const expresslayout = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const passport = require('passport');

//database connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pizzas')
.then(() => console.log('Database connected'))
.catch((error)=> console.log(error))

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET_KEY,
    resave : false,
    saveUninitialized:false,
    store : MongoDbStore.create({mongoUrl : 'mongodb://127.0.0.1:27017/pizzas'}),
    cookie : {maxAge : 1000 * 60 * 60 * 24}   //24 hours
}))

app.use(flash());



//config passport
const passportInit = require('./app/config/passport')
passportInit(passport)

app.use(passport.initialize())
app.use(passport.session())

//Asset for view (tell express)
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})


//set templates
app.use(expresslayout);
app.set("views", path.join(__dirname,"./resources/views"));
app.set("view engine","ejs");

//set route
require('./routes/web')(app);



app.listen(port , ()=>{
    console.log(`Listening on port: ${port}`);
})  

