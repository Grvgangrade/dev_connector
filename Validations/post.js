const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostHandler(data) {
    let errors = {};

    data.text = isEmpty(data.text) ?  '' : data.text;  
    
    if(Validator.isEmpty(data.text)){
        errors.text = "Post cannot be empty" ;
    }
    
    if(!Validator.isLength(data.text , { min:10 , max: 300})) {
        errors.text = "Post should be between 10 to 300 characters";
    } 
    
    
    return {
        errors,
        isValid : isEmpty(errors)
    }
}