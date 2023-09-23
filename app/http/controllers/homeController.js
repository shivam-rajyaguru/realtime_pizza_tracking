const Menu = require('../../models/menu');
function homeController() {
    //return as a object 
    //this function is called factory function it means it produce some product in function like factory and return object

    return{
         index : async function(req,res){

            const pizzas = await Menu.find();
            // console.log(pizzas);
            res.render('home' , {pizzas : pizzas});


            // Menu.find()
            // .then(function(data){
            //     console.log(data)
            //   return res.render('home') 
            // })
        
        }
    }
}
module.exports = homeController;