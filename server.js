const express = require('express');
const app = express();
const port = 8080;
const pool = require('./db/db')

// app.use is middleware, runs inbetween the request and response operations
//every time you run the req/res code, the middleware will be ran as well

app.use(express.json()) // req.body

// this means using the /styles route in reference from the root directory, then specifying the folder name
app.use('/styles', express.static('styles'));

app.set('view engine', 'ejs');

// res.json sends a json response to the front end

app.get('/', async (req,res) => {
    try {
        const person = await pool.query('SELECT * FROM person WHERE id = 2')
        let personObj = person.rows[0];
        res.render('home', { personObj } )
        // console.log('person -->', person)
        console.log('person rows 0 -->', person.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})


app.get('/login', async (req,res) => {
    try {
        res.render('login')
    } catch (err) {
        console.log(err.message)
    }
})

app.get('/deadend', async (req,res) => {
    res.status(400).send('nothing past here')
})




app.listen(port)