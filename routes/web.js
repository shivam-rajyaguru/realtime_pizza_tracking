// const homeController = require('../app/http/controllers/homeController');
// const authController = require('../app/http/controllers/authController');
// const cartController = require('../app/http/controllers/customers/cartController');
// const guest = require('../app/http/middlewares/guest')

// function initialRoutes(app){
//     app.get('/', homeController().index)

//     app.get('/login' , authController().login)
//     app.post('/login' , authController().postLogin)
//     app.get('/login' ,guest, authController().login)


//     app.post('/logout',authController().logout)
    
//     app.get('/register' ,authController().register)
//     app.post('/register' ,authController().postRegister)
//     app.get('/register',guest ,authController().register)
    
//     app.get('/cart', cartController().index)
    
//     app.post('/update-cart' , cartController().update)
// }

// module.exports = initialRoutes;

const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')

//authentication
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login', authController().login)
    app.get('/register', authController().register)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    //customer Routes
    app.post('/orders',auth, orderController().store)
    app.get('/customer/orders',auth, orderController().index)

    //admin routes
    app.get('/admin/orders',admin,adminOrderController().index)
}
module.exports = initRoutes