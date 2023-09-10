const session = require("express-session");

function cartController() {
    //return as a object 
    //this function is called factory function it means it produce some product in function like factory and return object

    return{
        index(req,res){
            res.render('customer/cart')
        } ,

        update(req,res){
            // let cart = {
            //     items : {
            //         pizzaId : {item: pizzaObject , qty : 0},
            //     },
            //     totalQty : 0,
            //     totalPrice : 0
            // }
            //for the first time creating card and creating object 
            if(!req.session.cart){
                req.session.cart = {
                    items : {},
                    totalQty : 0,
                    totalPrice : 0
                }               
            }    
            // console.log(req.body);

            let cart = req.session.cart;
                
            // check if item does't exist in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item : req.body,
                    qty : 1
                }
            cart.totalQty = cart.totalQty + 1;
            cart.totalPrice = cart.totalPrice + req.body.price    
            }
            else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price  
            }

            return res.json({totalQty : req.session.cart.totalQty});
        }
    }

}
module.exports = cartController;