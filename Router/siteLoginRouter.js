const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    let cookie = req.cookies.loggedin;
    if(cookie != undefined){
        res.redirect('/orders');
    }else{
        res.render('login', {message: ''});
    }
});

module.exports = router;