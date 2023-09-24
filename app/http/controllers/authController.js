
const User = require('../../models/user')
const bcrypt = require('bcrypt');
const passport = require('passport')


const { error, info } = require('laravel-mix/src/Log');

function authController() {
    const _getRedirectUrl =  (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }
    //return as a object 
    //this function is called factory function it means it produce some product in function like factory and return object

    return{
        login(req,res){
            res.render('auth/login') 
        },
        async postLogin(req ,res , next){
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }

            passport.authenticate('local',(err , user , info)=>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error' , info.message)
                    return res.redirect('/login')
                }

                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect(_getRedirectUrl(req))
                })
            })(req,res,next)
        },   
        register(req,res){
            res.render('auth/register') 
        },
        async postRegister(req,res){
            const {name ,email, password} = req.body;

            //validate request
            if(!name || !email || !password) {
                req.flash('error','All fields are required')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
            }
            // one user one email 
            // User.exists({email : email} , (err , result) => {
            //     if(result){
            //         req.flash('error','email already taken')
            //         req.flash('name',name)
            //         req.flash('email',email)
            //         return res.redirect('/register')
            //     }
            // })

            //hased password
            const hashedPaaswword = await bcrypt.hash(password , 10);

            //crate user
            const user = new User({
                name ,
                email,
                password : hashedPaaswword
            })

            user.save().then((user)=>{

                //Login
                return res.redirect('/')
            })
            .catch(err =>{
                req.flash('error','something went wrong')
                return res.redirect('/register')
            })

            
            // console.log(req.body);
        } ,
        logout(req , res){
            req.logout(function(){
                
            })
            return res.redirect('/')
        }

    }

}

module.exports = authController;