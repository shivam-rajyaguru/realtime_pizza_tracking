const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ejs = require('ejs');
const expresslayout = require('express-ejs-layouts');
const path = require('path');

//Asset for view (tell express)
app.use(express.static('public'));

//set templates
app.use(expresslayout);
app.set("views", path.join(__dirname,"./resources/views"));
app.set("view engine","ejs");

app.get('/',(req,res)=>{
    res.render('home')  
})

app.get('/login' , (req,res)=>{
    res.render('auth/login')
})

app.get('/register' , (req,res)=>{
    res.render('auth/register')
})

app.get('/cart',(req,res)=>{
    res.render('customer/cart')
})

app.listen(port , ()=>{
    console.log(`Listening on port: ${port}`);
})  