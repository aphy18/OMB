const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/', async (req,res) => {
    try {
        let getExpenses = await pool.query('SELECT * FROM expenses')
        console.log('get Expenses -->', getExpenses.rows)
        let expenses = getExpenses.rows
        req.session.allExpenses = expenses;
        console.log('req session expesnes -->', req.session.allExpenses)
        res.render('expenses', { expenses })
    } catch (err) {
        console.log(err.message)
    }
})

router.post('/', async(req,res) => {
    try {
        let allExpenses = req.session.allExpenses;
        let user = req.session.user;
        for (let key in req.body) {
            req.body['name'] = key
        }

        for (let expense of allExpenses) {
            if (expense.expense_name === req.body.name) {
                console.log('the expense -->', expense)
                user.savings = user.savings - parseInt(expense.price)
                await pool.query('UPDATE account SET savings = $1 WHERE id = $2', [user.savings, user.id])
            }
        }

        res.redirect('/')

    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router;