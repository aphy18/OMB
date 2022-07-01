const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('home', { obj: {message: 'good morning cookies', number: 5, sport: 'basketball'} })
})


app.listen(port)