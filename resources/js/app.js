import axios from 'axios';
import Noty from 'noty';
import { initAdmin } from './admin/admin';
import moment from 'moment';


let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type : 'success',
            timeout : 1000,
            progressBar : false,
            // layout : 'bottomCenter',
            text : 'Item added to cart'
        }).show();

    }).catch((err) => {
        new Noty({
            type : 'error',
            timeout : 1000,
            progressBar : false,
            text : 'Something went wrong'
        }).show();
    })

}

addToCart.forEach((btn)=>{
    btn.addEventListener('click' , (e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
        // console.log(pizza);
        // console.log(e);
    })
})

//Remove alert message after x seconds
const alertMsg = document.querySelector('#success-alert');
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}


initAdmin()


//change order status
let statuses = document.querySelectorAll('.status-line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')
// console.log(order);

function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepComplete = true;
    statuses.forEach((status)=>{
        let dataProps = status.dataset.status
        if(stepComplete){
            status.classList.add('step-completed')
        }
        if(dataProps === order.status){
            stepComplete=false
            time.innerText = moment(order.updateAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
        }
    })
}
updateStatus(order)

//socket
let socket = io();

//Join

if(order){
    socket.emit('join',`order_${order._id}`)  //order_5dfjnfdnjdsjnd89
}

socket.on('orderUpdate',(data)=>{
    const updateOrder = {...order}
    updateOrder.updateAt = moment().format()
    updateOrder.status = data.status
    updateStatus(updateOrder)
    new Noty({
        type : 'success',
        timeout : 1000,
        progressBar : false,
        // layout : 'bottomCenter',
        text : 'Order Updated'
    }).show();
})