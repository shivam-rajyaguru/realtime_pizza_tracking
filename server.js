const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ejs = require('ejs');
const expresslayout = require('express-ejs-layouts');
const path = require('path');

app.get('/',(req,res)=>{
    res.render('home')  
})

//set templates
app.use(expresslayout);
app.set("views", path.join(__dirname,"./resources/views"));
app.set("view engine","ejs");

app.listen(port , ()=>{
    console.log(`Listening on port: ${port}`);
})  