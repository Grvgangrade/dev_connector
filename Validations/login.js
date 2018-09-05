const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginHandler(data) {
    let errors = {};

    data.email = isEmpty(data.email) ?  '' : data.email;  
    data.password = isEmpty(data.password) ?  '' : data.password;  
    
    
    if(!Validator.isEmail(data.email)) {
        console.log(Validator.isEmpty(data.email))
        errors.email = "Email is invalid";
    } 
    
    if(Validator.isEmpty(data.email)){
        errors.email = "Email cannot be empty" ;
    }
    
    if(Validator.isEmpty(data.password)){
        errors.password = "Password cannot be empty" ;
    }
    
    if(!Validator.isLength(data.password , { min:6})) {
        errors.password = "Password is incorrect";
    } 
    
   
    
    return {
        errors,
        isValid : isEmpty(errors)
    }
}