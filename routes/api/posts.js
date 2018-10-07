const express = require('express');
const router = express.Router();
const passport = require('passport');

//load Post model
const Post = require('../../models/Posts');

//load User model
const User = require('../../models/User');

//load Profile model
const Profile = require('../../models/Profile');

//load validation handler
const validatePostHandler = require('../../Validations/post')


router.get('/test', (req,res) => res.json({
    "test" : "posts tested"
}))

//Post route to create post
router.post('/' , passport.authenticate('jwt' , { session: false}), (req, res) => {
    const { errors , isValid } = validatePostHandler(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors)
    }
    
        const newPost = new Post({
            text: req.body.text,
            user: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar
        })
        
        newPost.save().then(post => {
            res.json(post)
        })
        .catch(err => res.json(err));
})

// Get route to fetch all posts
router.get('/' , (req, res) => {
    const errors = {};
    Post.find()
    .then(post => {
        if(!post){
            errors.nopost = 'No post found'
            return res.status(404).json(errors)
        }
        res.json(post)
    })
    .catch(err => res.json(err));
})

// Get route to fetch post by ID
router.get('/:id' , (req, res) => {
    const errors = {};
    Post.findById(req.params.id)
    .then(post => {
        if(!post){
            errors.nopost = 'No post found'
            return res.status(404).json(errors)
        }
        res.json(post)
    })
    .catch(err => res.json(err));
})


//Delete post by the owner of the post
//route api/posts/:id
router.delete('/:id' , passport.authenticate('jwt' , { session : false }) , (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
        if(post.user.toString() === req.user.id){
            post.remove()
                .then(() => res.json({
                success : true
            }))
            .catch(err => res.status(404).json({nopostfound : 'no post found'}));
        }else{
            res.status(401).json({notauthorised : 'User not authorised to delete this post'})
        }
    })
    .catch( err => res.json(err));
})



//Post likes on the posts
//public route
router.post('/like/:id' , passport.authenticate('jwt' , { session : false } ) , (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.json({alreadyliked : 'User already liked the post'})
            }
                post.likes.unshift({user : req.user.id})
                post.save()
                .then(post => res.json(post))
                .catch(err => res.json(err));   
    })
    .catch(err => res.json(err));
})

//Post Unlikes on the posts
//public route
router.post('/unlike/:id' , passport.authenticate('jwt' , { session : false } ) , (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
               // return res.json({alreadyliked : 'User already liked the post'})
                const unlikeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
                post.likes.splice(unlikeIndex , 1)
                post.save()
                    .then(post => {
                    res.json(post)
                })
                .catch(err => res.json(err))
            }else{
                return res.json({notliked : 'User has not liked the post'})  
            }
    })
    .catch(err => res.json(err));
})

//write a comment on the post
//route /comment/id
router.post('/comment/:id' , passport.authenticate('jwt' , { session: false}), (req, res) => {
    const { errors , isValid } = validatePostHandler(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors)
    }
    Post.findById(req.params.id).then(post => {
        const newComment = {
            text: req.body.text,
            user: req.user.id,
            name: req.user.name,
            avatar: req.user.avatar
        }
        post.comment.unshift(newComment)
            post.save().then(post => {
            res.json(post)
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id' , passport.authenticate('jwt' , { session : false }) , (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;