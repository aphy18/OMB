const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/', (req,res) => {
    
    try {
        let user = req.session.user;
        if (!user) {
            res.redirect('/login')
        } else {
            res.render('transfer', { user })
        }
    
    } catch (err) {
        console.log(err.message)
    } 
})

router.post('/', async(req,res) => {
    const { from, to , amount } = req.body;
    const user = req.session.user;
    let { chequing, savings } = user;

    if (!isNaN(amount)) {
        if (from !== to) {
            if (from === 'chequing') {
                if (chequing < amount) {
                    res.status(400).send('not enough to transfer')
                } else {
                    user.chequing = chequing = chequing - parseInt(amount);
                    user.savings = savings = savings + parseInt(amount);
                    await pool.query('UPDATE account SET chequing = $1, savings = $2 WHERE user_id = $3', [user.chequing, user.savings, user.id]);
                    res.redirect('/');
                }
        
            } else if (from === 'savings') {
                if (savings < amount) {
                    res.status(400).send('not enough to transfer')
                } else {
                    user.savings = savings - parseInt(amount);
                    user.chequing = chequing = chequing + parseInt(amount);
                    await pool.query('UPDATE account SET chequing = $1, savings = $2 WHERE user_id = $3', [user.chequing, user.savings, user.id]);
                    res.redirect('/');
                }
            }
        } else {
            res.status(400).send('must transfer to a different account');
        }
    } else {
        res.status(400).send('enter a valid amount');
    }
})





module.exports = router;