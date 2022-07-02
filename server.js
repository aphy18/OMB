const express = require('express');
const app = express();
const port = 8080;
const pool = require('./db/db'); // to connect db to server
const bodyParser = require('body-parser'); // to send request body to server
const cookieSession = require('cookie-session'); // to save current logged in user

// app.use is middleware, runs inbetween the request and response operations
//every time you run the req/res code, the middleware will be ran as well
// bodyParser parses data sent by HTTP requests from the client side, organizes it inside of an object

app.use(express.json()) // req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
    name: 'session',
    keys: ['abcdefghijklmnopqrstuvwxyz123456789']
}))

// this means using the /styles route in reference from the root directory, then specifying the folder name
app.use('/styles', express.static('styles'));

app.set('view engine', 'ejs');

// res.json() sends a json response to the front end

app.get('/', async (req,res) => {
    try {
        const person = await pool.query('SELECT * FROM person WHERE id = 2')
        let personObj = person.rows[0];
        res.render('home', { personObj } )
        // console.log('person -->', person)
        // console.log('person rows 0 -->', person.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})


app.get('/login', async (req,res) => {
    try {
        if (req.session.user) {
            res.send('Already logged in')
        }
        res.render('login')
    } catch (err) {
        console.log(err.message)
    }
})

app.post('/login', async (req,res) => {
    try {
        const { card, password } = req.body;
        const checkLogin = await pool.query('SELECT * FROM person')
        
        for (let person of checkLogin.rows) {
            if (person.card_number === parseInt(card) && person.user_password === password) {
                res.cookie('user', person)
            } else {
                console.log('invalid card number or password')
            }
        }

        res.redirect('/')

    } catch (err) {
        console.log(err.message)
    }
})

app.get('/deadend', async (req,res) => {
    res.status(400).send('nothing past here')
})




app.listen(port)