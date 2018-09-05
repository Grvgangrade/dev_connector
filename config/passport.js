const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('./keys');

const User = mongoose.model('users');


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use( 
        new jwtStrategy( opts , (jwt_payload , done) => {
            User.findById(jwt_payload.id).then(user =>{
                if(user){
                    done(null,user)
                }else{
                    done(null,false)
                }
            })
            .catch(err => console.log(err))
        })
    );
};