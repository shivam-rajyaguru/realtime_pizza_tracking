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




//session config
app.use(session({
    secret: process.env.COOKIE_SECRET_KEY,
    resave : false,
    saveUninitialized:false,
    store : MongoDbStore.create({mongoUrl : 'mongodb://127.0.0.1:27017/pizzas'}),
    cookie : {maxAge : 1000 * 60 * 60 * 24}   //24 hours
}))

app.use(flash());

//Asset for view (tell express)
app.use(express.static('public'));
app.use(express.json())

//global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})
//set templates
app.use(expresslayout);
app.set("views", path.join(__dirname,"./resources/views"));
app.set("view engine","ejs");

//set route
require('./routes/web')(app);

//database connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pizzas')
.then(() => console.log('Database connected'))
.catch((error)=> console.log(error))

app.listen(port , ()=>{
    console.log(`Listening on port: ${port}`);
})  