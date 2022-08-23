const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    try {
        let user = req.session.user;

        if (!user) {
            res.redirect('/login');
        } else {
            res.render('home', { user });
            console.log('current user --->', user);
        }
        
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;