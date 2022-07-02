const express = require('express');
const app = express();
const port = 8080;
const pool = require('./db/db')

app.use(express.json()) // req.body

app.set('view engine', 'ejs');

app.get('/', async (req,res) => {
    try {
        const person = await pool.query('SELECT * FROM person WHERE id = 2')
        // res.json(person.rows[0])
        console.log(person.rows[0])
        res.render('home', { obj: {message: 'good morning cookies', number: 5, sport: 'basketball'} })
    } catch (err) {
        console.log(err.message)
    }
})

app.get('/deadend', async (req,res) => {
    res.status(400).send('nothing past here')
})

app.get('/test', async (req,res) => {
    res.render('test', {obj: { names: ['Aphy','Jenny','Ben']}})
})


app.listen(port)