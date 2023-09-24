const { object } = require('loda');
const mongoose = require('mongoose');
const user = require('./user');

const orderSchema = new mongoose.Schema({
    customerId : {
                type : mongoose.Schema.Types.ObjectId ,
                ref : 'User',
                required : true
    },
    items : {type : object , required : true},
    phone : {type : String , required : true},
    address : {type : String , required : true},
    paymentType : {type : String, default : 'COD'},
    status : {type : String , default : 'order_placed'},
        
},{timestamps : true})

module.exports = new mongoose.model('order',orderSchema);
