let Schema = require('../Models/userSchema');

module.exports = class User{
    login(obj,cb){
        Schema.findOne({userName: obj.username}, (err,doc)=>{
            if(err){
                cb(undefined,err);
            }else{
                cb(doc,undefined);
            }
        })
    }
}