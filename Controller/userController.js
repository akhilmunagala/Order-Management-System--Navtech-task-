const User = require('../Models/User');

exports.login = (req,res)=>{

    let data = req.body;
    // console.log('data',data);
    const user = new User();


    user.login(data, (response,err)=>{
       if(response){
        //    console.log('response',response);
           if(response.password == data.password){
                // // res.status(200).send('User logged in');
                // if(data.rememberMe == 'on'){
                //     res.redirect('/orders');
                // }else{
                //     res.redirect('/orders');
                // }
                
                let randomNumber=Math.random().toString();
                randomNumber=randomNumber.substring(2,randomNumber.length);
                res.cookie('loggedin',randomNumber, { maxAge: 900000, httpOnly: true });
                res.redirect('/orders');

           }else{
               res.status(400).send('Passwords do not match');
           }
       }else{
           res.render('login', {message: 'Username or password does not match'});
       }
    });
}