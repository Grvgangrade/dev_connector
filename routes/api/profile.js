const express = require('express');
const router = express.Router();
const passport = require('passport');

//load profile validation
const validateProfileHandler = require('../../Validations/profile');

//load experience validation handler
const validateExpHandler = require('../../Validations/experience');

//Load education validation handler
const validateEducationHandler = require('../../Validations/education');


//load User model
const User = require('../../models/User');

//load Profile model
const Profile = require('../../models/Profile');


//to test the route
router.get('/test', (req, res) => res.json({
    "test": "profile tested"
}))

//to check if the profile already exist

router.get('/', passport.authenticate('jwt', { session: false }), (req,res) => {
        const errors = {};
        Profile.findOne({
                user: req.user.id
            })
            .populate('user' , [ 'name' , 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noProfile = 'Profile does not exist'
                    res.status(404).json(errors)
                } else {
                    res.json(profile)
                }
            })
            .catch(err => console.log(err))
})


//to check all the profiles that exist

router.get('/all' , (req,res) => {
        const errors = {};
        Profile.find()
            .populate('user' , [ 'name' , 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noProfile = 'Profile does not exist'
                    res.status(404).json(errors)
                } else {
                    res.json(profile)
                }
            })
            .catch(err => res.json(err))
})

//get profile by handle
router.get('/handle/:handle' , (req,res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle})
    .populate('user' , [ 'name' , 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noProfile = "Profile does not exist"
            return res.status(400).json(errors)
        }
        res.json(profile);
    })
    .catch(err => res.json({profile : "profile does not exist"}));
})

//get profile by user_id
router.get('/user/:user_id' , (req,res) => {
    const errors = {};
    Profile.findOne({user: req.params.user_id})
    .populate('user' , [ 'name' , 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noProfile = "Profile does not exist"
            return res.status(400).json(errors)
        }
        res.json(profile);
    })
    .catch(err => res.json({profile : " profile does not exist"}));
})

//create profile
router.post('/create-profile', passport.authenticate('jwt' , { session : false}) , (req,res) => {
    const { errors , isValid } = validateProfileHandler(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors)
    }
    
    const profilefields = {};
    
    profilefields.user = req.user.id;
    
    if(req.body.handle !== undefined) profilefields.handle = req.body.handle;
    if(req.body.company !== undefined) profilefields.company = req.body.company;
    if(req.body.website !== undefined) profilefields.website = req.body.website;
    if(req.body.status !== undefined) profilefields.status = req.body.status;
    if(req.body.location !== undefined) profilefields.location = req.body.location;
    if(req.body.bio !== undefined) profilefields.bio = req.body.bio;
    if(req.body.githubusername !== undefined) profilefields.githubusername = req.body.githubusername;
    
    //skills
    profilefields.skills = {};
    if(req.body.skills !== undefined) profilefields.skills = req.body.skills.split(',');
    
    // Social
    profilefields.social = {};
    if (req.body.youtube) profilefields.social.youtube = req.body.youtube;
    if (req.body.twitter) profilefields.social.twitter = req.body.twitter;
    if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profilefields.social.instagram = req.body.instagram;

    
    Profile.findOne({ user : req.user.id}).then(profile => {
        if(!profile) {
            //Create Profile
            //first check if the handle exist
            Profile.findOne({handle : req.body.handle})
                .then(handle => {
                if(handle){
                    errors.handle = "Handle already exist";
                    res.status(400).json(errors)
                }else {
                    const newProfile = new Profile(profilefields)
                    //Save Profile
                    newProfile.save()
                        .then(profile => {
                        res.json(profile)
            })
            .catch(err => console.log(err))
                }
            })
        } else {
            //update profile
            Profile.findOneAndUpdate({ user : req.user.id },
                                     { $set : profilefields }, 
                                     { new : true })
                .then(profile => res.json(profile))
                .catch(err => res.json(err))
        }
    })
    .catch(err => console.log(err))
})

//Add experience 
router.post('/experience' , passport.authenticate('jwt' , {session : false}) , (req, res) => {
    const { errors , isValid } = validateExpHandler(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user : req.user.id })
        .then(profile => {
        if(!profile){
            errors.nouser = " User does not exist"
            return res.status(404).json(errors)
        }
        const newExp = {
            company : req.body.company,
            title : req.body.title,
            description : req.body.description,
            from : req.body.from,
            to : req.body.to ,
            current : req.body.current
        }
        profile.experience.unshift(newExp);
            profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    })


//Add education 
router.post('/education' , passport.authenticate('jwt' , {session : false}) , (req, res) => {
    const { errors , isValid } = validateEducationHandler(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user : req.user.id })
        .then(profile => {
        const newEdu = {
            school : req.body.school,
            degree : req.body.degree,
            fieldofstudy : req.body.fieldofstudy,
            description : req.body.description,
            from : req.body.from,
            to : req.body.to ,
            current : req.body.current
        }
        profile.education.unshift(newEdu);
            profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    })


//Delete experience 
router.delete('/experience/:id' , passport.authenticate('jwt' , {session : false}) , (req, res) => {
   
    Profile.findOne({ user : req.user.id })
        .then(profile => {
        //to find the remove index
           const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.id)
           
           //remove item by index
           profile.experience.splice(removeIndex , 1);
            profile.save().then(profile =>
                               res.json(profile))
        .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    })

//Delete education 
router.delete('/education/:id' , passport.authenticate('jwt' , {session : false}) , (req, res) => {
   
    Profile.findOne({ user : req.user.id })
        .then(profile => {
        //to find the remove index
           const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.id)
           
           //remove item by index
           profile.education.splice(removeIndex , 1);
            profile.save().then(profile =>
                               res.json(profile))
        .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    })

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
