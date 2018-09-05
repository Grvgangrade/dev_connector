const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterHandler(data) {
    let errors = {};

    data.name = isEmpty(data.name) ? '' : data.name;  
    data.email = isEmpty(data.email) ?  '' : data.email;  
    data.password = isEmpty(data.password) ?  '' : data.password;  
    data.password2 = isEmpty(data.password2) ?  '' : data.password2;  

    if(Validator.isEmpty(data.name)){
        errors.name = "Name cannot be empty" ; 
    }
    
    if(!Validator.isLength(data.name , { min:2 , max:30 })) {
        errors.name = "Name must be between 2 to 30 charactors";
        console.log(data.name) 
    } 
    
    if(Validator.isEmpty(data.email)){
        errors.email = "Email cannot be empty" ;
    }
    
    if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    } 
    
    if(!Validator.isLength(data.password , { min:6 , max:30 })) {
        errors.password = "Password must be between 6 to 30 charactors";
    }
    
    if(Validator.isEmpty(data.password)){
        errors.password = "Password cannot be empty" ;
    }
     
    
    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password is required" ;
    }
    
    if (!Validator.equals(data.password , data.password2)){
        errors.password2 = "Password does not match";
    }

    
    return {
        errors,
        isValid : isEmpty(errors)
    }
}