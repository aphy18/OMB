const express = require('express');
const app = express();
const port = 8080;
const pool = require('./db/db'); // to connect db to server
const bodyParser = require('body-parser'); // to send request body to server
const cookieSession = require('cookie-session'); // to save current logged in user


// app.use is middleware, runs inbetween the request and response operations
//every time you run the req/res code, the middleware will be ran as well
// bodyParser parses data sent by HTTP requests from the client side, organizes it inside of an object

app.use(express.json()); // req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
    name: 'session',
    keys: ['abcdefghijklmnopqrstuvwxyz123456789']
}));


// this means using the /styles route in reference from the root directory, then specifying the folder name
app.use('/styles', express.static('styles'));

app.set('view engine', 'ejs');

// res.json() sends a json response to the front end

app.get('/', async (req,res) => {
    try {
        let user = req.session.user;
        
        if (!user) {
            res.status(400).send('You must log in to access the home page')
        } else {
            res.render('home', { user })
            console.log('current user --->', user)
        }
        
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

app.post('/login', async (req,res) => {
    try {
        const { card, password } = req.body;
        const checkLogin = await pool.query('SELECT * FROM person JOIN account ON person.id = account.user_id')
        
        console.log('check login rows -->', checkLogin.rows)
        for (let person of checkLogin.rows) {
            if (person.card_number === parseInt(card) && person.user_password === password) {
                req.session.user = person;
            } else {
                console.log('invalid card number or password')
            }
        }

        res.redirect('/')

    } catch (err) {
        console.log(err.message)
    }
})


app.get('/transfer', (req,res) => {
    try {
        res.render('transfer')
    } catch (err) {
        console.log(err.message)
    } 
})

app.post('/transfer', async(req,res) => {
    const { first, second, amount } = req.body;
    let userID = req.session.user.id;
    console.log('req body from transfer -->', req.body)
    if (isNaN(amount)) {
        res.status(400).send('amount needs to be a numerical value')
    }

    let transfer = await pool.query('SELECT chequing, savings FROM account WHERE user_id = $1', [userID])

    console.log(transfer.rows)
    

})

app.get('/logout', (req,res) => {
    req.session.user = null;
    res.redirect('/login')

})

app.get('/deadend', async (req,res) => {
    res.status(400).send('nothing past here')
})




app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})