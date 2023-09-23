const LocalStrategy = require('passport-local').Strategy
const { use } = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { error } = require('laravel-mix/src/Log');

function init(passport){
    passport.use(new LocalStrategy({usernameField : 'email'} ,async (email , password , done)=>{
        //Login
        //Check if email exist
        const user = await User.findOne({email : email})
        
        if(!user){
            return done(null , false , {message : 'No user with this email id'})
        }
       
        
        bcrypt.compare(password , user.password).then(match=>{
            if(match){
                return done(null , user , {message : 'Logged in Succesfully'})
            }
            return done(null , false , {message : 'wrong username or password'})
        }).catch(err=>{
            return done(null , false , {message : 'Something went wrong'})
        })
        
    }))
   

    // to store something in to session here we store _id as a field in to session

    passport.serializeUser((user , done)=>{
         done(null , user._id)
    })

    passport.deserializeUser(async (id,done)=>{
        // User.findById(id,(err , user)=>{
        //     done(err,user)
        // })

        const user = await User.findById(id);
        done(null,user)
    })

}

module.exports = init

