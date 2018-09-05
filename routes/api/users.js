const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterHandler = require('../../Validations/register');
const validateLoginHandler = require('../../Validations/login');


//@to register user
router.post('/register' , (req,res) => {
    const { errors , isValid } = validateRegisterHandler(req.body)
    
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    User.findOne({email:req.body.email})
    .then(user => { 
        if(user){
            errors.email
            return res.status(404).json(errors)
        }else {
           const avatar = gravatar.url(req.body.email , {
                s:'200',
                r:'pg',
                d:'mm'
            });
            
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password , salt , (err,hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })
        }
    })
    .catch(err => console.log(err));
})

router.post('/login' , (req,res) => {
    const email = req.body.email
    const password = req.body.password
    
    const { errors , isValid } = validateLoginHandler(req.body)
    
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    User.findOne({email})
    .then(user => {
        if(!user) {
            errors.email = 'User does not exist'
            return res.status(404).json(errors)
        }
        
        bcrypt.compare(password , user.password)
        .then(match => {
            if(!match){
                errors.password = 'Password is incorrect'
                return res.status(400).json(errors)
            }
                const payload = {
                id: user.id,
                name:user.name,
                avatar:user.avatar
                }
            
             jwt.sign(payload,
             keys.secretOrKey,
             { expiresIn : 3600},
            (err,token) =>
                res.json({
                    success: true,
                    token: 'bearer ' + token  
            })
            )
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
})

router.get('/current', passport.authenticate('jwt' , { session : false}) , (req,res) => {
    res.json({id : req.user});
})


module.exports = router;
