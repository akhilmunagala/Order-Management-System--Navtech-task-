const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');

const orderController = require('../Controller/orderController');

router.get('/',(req,res)=>{
    // console.log('req session',req.session);

    requestPromise.get('http://localhost:3000/order/list')
        .then(result => {
            res.render('orders', {orders: JSON.parse(result)});
        })
        .catch(err => {
            res.status(401).send('Error fetching orders');
        });
    

    // if(req.session.loggedin){
    //     res.render('orders');
    // }else{
    //     res.redirect('/login');
    // }
});



// router.post('/create', orderController.createOrder);
// router.get('/list', orderController.getAllOrders);
// router.delete('/delete/:id', orderController.deleteOrder);
// router.put('/update/:id', orderController.updateOrder);

module.exports = router;