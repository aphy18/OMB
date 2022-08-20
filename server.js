const express = require('express');
const app = express();
const port = 8080;
const pool = require('./db/db'); // to connect db to server
const bodyParser = require('body-parser'); // to send request body to server
const cookieSession = require('cookie-session'); // to save current logged in user
app.set('view engine', 'ejs');



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
app.use('/images', express.static('images'));
app.use('/scripts', express.static('scripts'));


// require routes
const homeRoute = require('./routes/home');
const loginRoute = require('./routes/login');
const expensesRoute = require('./routes/expenses');
const transferRoute = require('./routes/transfer');
const withdrawalRoute = require('./routes/withdrawal');
const depositRoute = require('./routes/deposit');
const jobsRoute = require('./routes/jobs');
const applyRoute = require('./routes/apply');
const workRoute = require('./routes/work');
const logoutRoute = require('./routes/logout');

// use the routes in server js
app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/expenses', expensesRoute);
app.use('/transfer', transferRoute);
app.use('/withdrawal', withdrawalRoute);
app.use('/deposit', depositRoute);
app.use('/jobs', jobsRoute);
app.use('/', applyRoute);
app.use('/', workRoute);
app.use('/logout', logoutRoute);





app.get('/deadend', async (req,res) => {
    res.status(400).send('nothing past here')
})




app.listen(port, () => { 
console.log(`Listening on port ${port}`)})

