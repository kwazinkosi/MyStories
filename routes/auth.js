const express = require('express');
const passport = require('passport');
const router = express.Router();



// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));


module.exports = router;


// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
});

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout(()=>{
        try{
            res.redirect('/');
        }
        catch(err){
            console.log(err);
        }
    })
});

module.exports = router;

