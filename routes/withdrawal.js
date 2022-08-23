const express = require('express');
const router = express.Router();
const pool = require('../db/db');


router.get('/', async (req,res) => {
    let user = req.session.user;
    let account = await pool.query('SELECT chequing, savings, money_on_hand FROM account WHERE user_id = $1', [user.id]);
    let getAccount = account.rows[0];
    if (!user) {
        res.redirect('/login');
    } else {
        res.render('withdrawal', { getAccount });
    } 
})

router.post('/', async (req,res) => {
    let user = req.session.user;
    let { money_on_hand, chequing, savings } = user;
    let { account, amount } = req.body;

    if (!isNaN(amount)) {
        
        if (account === 'chequing') {
            if (chequing >= amount) {
                user.chequing = chequing - parseInt(amount);
                user.money_on_hand = money_on_hand + parseInt(amount);
                await pool.query('UPDATE account SET chequing = $1, money_on_hand = $2 WHERE user_id = $3', [user.chequing, user.money_on_hand, user.id]);
                res.redirect('/');
            } else {
                res.status(400).send('Not enough to withdrawal');
            }
        } else if (account === 'savings') {
            if (savings >= amount) {
                user.savings = savings - parseInt(amount);
                user.money_on_hand = money_on_hand + parseInt(amount);
                await pool.query('UPDATE account SET savings = $1, money_on_hand = $2 WHERE user_id = $3', [user.savings, user.money_on_hand, user.id]);
                res.redirect('/');
            } else {
                res.status(400).send('Not enough to withdrawal');
            }
                
        }
    }
})

module.exports = router;