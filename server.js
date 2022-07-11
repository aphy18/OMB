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
            res.redirect('/login')
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
        let user = req.session.user;
        if (!user) {
            res.redirect('/login')
        } else {
            console.log('user -->', user)
            res.render('transfer', { user })
        }
    
    } catch (err) {
        console.log(err.message)
    } 
})

app.post('/transfer', async(req,res) => {
    const { from, to , amount } = req.body;
    const user = req.session.user;
    let { chequing, savings } = user;


    console.log('req body -->', req.body)

    if (!isNaN(amount)) {
        if (from !== to) {
            if (from === 'chequing') {
                if (chequing < amount) {
                    res.status(400).send('not enough to transfer')
                } else {
                    user.chequing = chequing = chequing - parseInt(amount);
                    user.savings = savings = savings + parseInt(amount);
                    await pool.query('UPDATE account SET chequing = $1, savings = $2 WHERE user_id = $3', [chequing, savings, user.id])
                    res.redirect('/')
                }
        
            } else if (from === 'savings') {
                if (savings < amount) {
                    res.status(400).send('not enough to transfer')
                } else {
                    user.savings = savings - parseInt(amount);
                    user.chequing = chequing = chequing + parseInt(amount);
                    await pool.query('UPDATE account SET chequing = $1, savings = $2 WHERE user_id = $3', [chequing, savings, user.id])
                    res.redirect('/')
                }
            }
        } else {
            res.status(400).send('must transfer to a different account')
        }
    } else {
        res.status(400).send('enter a valid amount')
    }
})


app.get('/deposit', async (req,res) => {
    let user = req.session.user;
    if (!user) {
        res.redirect('/login')
    } else {
        res.render('deposit')
    }
})

app.post('/deposit', async (req,res) => {
    console.log('req body -->', req.body)
    let user = req.session.user;
    let { money_on_hand, chequing, savings } = user;
    let { account, amount } = req.body;

    console.log('testing -->', money_on_hand, chequing)

    if (!isNaN(amount)) {
        if (money_on_hand >= amount) {
            if (account === 'chequing') {
                user.chequing = chequing + parseInt(amount);
                user.money_on_hand = money_on_hand - parseInt(amount);
                await pool.query('UPDATE account SET chequing = $1, money_on_hand = $2 WHERE user_id = $3', [chequing, money_on_hand, user.id])
                res.redirect('/')
                
            } else if (account === 'savings') {
                user.savings = savings + parseInt(amount);
                user.money_on_hand = money_on_hand - parseInt(amount);
                await pool.query('UPDATE account SET savings = $1, money_on_hand = $2 WHERE user_id = $3', [savings, money_on_hand, user.id])
                res.redirect('/')
            }
            
        } else {
            res.status(400).send('not enough money on hand')
        }
    } else {
        res.status(400).send('Amount entered is not a number')
    }
})

app.get('/withdrawal', async (req,res) => {
    let user = req.session.user;
    if (!user) {
        res.redirect('/login')
    } else {
        res.render('withdrawal')  
    } 
})

app.post('/withdrawal', async (req,res) => {
    let user = req.session.user;
    let { money_on_hand, chequing, savings } = user;
    let { account, amount } = req.body;

    if (!isNaN(amount)) {
        
        if (account === 'chequing') {

            if (chequing >= amount) {
                user.chequing = chequing - parseInt(amount);
                user.money_on_hand = money_on_hand + parseInt(amount);
                await pool.query('UPDATE account SET chequing = $1, money_on_hand = $2 WHERE user_id = $3', [chequing, money_on_hand, user.id])
                res.redirect('/')

            } else {
                res.status(400).send('Not enough to withdrawal')
            }
                
        } else if (account === 'savings') {
            
            if (savings >= amount) {
                user.savings = savings - parseInt(amount);
                user.money_on_hand = money_on_hand + parseInt(amount);
                await pool.query('UPDATE account SET savings = $1, money_on_hand = $2 WHERE user_id = $3', [savings, money_on_hand, user.id])
                res.redirect('/')
            } else {
                res.status(400).send('Not enough to withdrawal')
            }
                
        }
            
    }
})

app.get('/jobs', async (req, res) => {
    try {
        let user = req.session.user;
        if (!user) {
            res.redirect('/login')
        } else {
            let jobs = await pool.query('SELECT * FROM job JOIN job_application ON job.id = job_id')
            let getJobs = jobs.rows
            let storeButtonType = {};
            for (let i=0; i < getJobs.length; i++) {
                if (getJobs[i].hired === true) {
                    storeButtonType[`btn${i}`] = 'disabled'
                } else {
                    storeButtonType[`btn${i}`] = 'submit'
                }
            }
            
            console.log('jobs -->', getJobs)
            res.render("jobs", { getJobs, storeButtonType })
        }
    } catch (err) {
        console.log(err.message)
    }
})


app.get('/job/:job_name', async (req,res) => {
    try {
        let user = req.session.user;
        if (!user) {
            res.redirect('/login')
        } else {

        }
    } catch (err) {
        console.log(err.message)
    }
})


app.get('/logout', (req,res) => {
    req.session.user = null;
    res.redirect('/login')

})

app.get('/deadend', async (req,res) => {
    res.status(400).send('nothing past here')
})




app.listen(port, () => { 
console.log(`Listening on port ${port}`)})