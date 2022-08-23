const express = require('express');
const router = express.Router();
const pool = require('../db/db');


router.get('/', async (req,res) => {
    try {
       res.render('login');
    } catch (err) {
        console.log(err.message);
    }
})

router.post('/', async (req,res) => {
    try {
        const { card, password } = req.body;
        const checkLogin = await pool.query('SELECT * FROM person JOIN account ON person.id = account.user_id');
        
        console.log('check login rows -->', checkLogin.rows)
        for (let person of checkLogin.rows) {
            if (person.card_number === parseInt(card) && person.user_password === password) {
                req.session.user = person;
                res.redirect('/');
            }
        }

    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;