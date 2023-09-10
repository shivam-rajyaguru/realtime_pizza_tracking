function authController() {
    //return as a object 
    //this function is called factory function it means it produce some product in function like factory and return object

    return{
        login(req,res){
            res.render('auth/login') 
        }
        ,
        register(req,res){
            res.render('auth/register') 
        }
    }

}

module.exports = authController;