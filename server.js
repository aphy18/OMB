const express = require('express');
const app = express();
const port = 8080;
const pool = require('./db/db')

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('home', { obj: {message: 'good morning cookies', number: 5, sport: 'basketball'} })
})

app.get('/deadend', (req,res) => {
    res.status(400).send('nothing past here')
})

app.get('/test', (req,res) => {
    res.render('test', {obj: { names: ['Aphy','Jenny','Ben']}})
})


app.listen(port)