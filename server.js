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

// use the routes in server js
app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/expenses', expensesRoute)



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
                    await pool.query('UPDATE account SET chequing = $1, savings = $2 WHERE user_id = $3', [user.chequing, user.savings, user.id])
                    res.redirect('/')
                }
        
            } else if (from === 'savings') {
                if (savings < amount) {
                    res.status(400).send('not enough to transfer')
                } else {
                    user.savings = savings - parseInt(amount);
                    user.chequing = chequing = chequing + parseInt(amount);
                    await pool.query('UPDATE account SET chequing = $1, savings = $2 WHERE user_id = $3', [user.chequing, user.savings, user.id])
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
    let account = await pool.query('SELECT chequing, savings, money_on_hand FROM account WHERE user_id = $1', [user.id])
    let getAccount = account.rows[0];
    console.log(getAccount)
    if (!user) {
        res.redirect('/login')
    } else {
        res.render('deposit', { getAccount })
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
                await pool.query('UPDATE account SET chequing = $1, money_on_hand = $2 WHERE user_id = $3', [user.chequing, user.money_on_hand, user.id])
                res.redirect('/')
                
            } else if (account === 'savings') {
                user.savings = savings + parseInt(amount);
                user.money_on_hand = money_on_hand - parseInt(amount);
                await pool.query('UPDATE account SET savings = $1, money_on_hand = $2 WHERE user_id = $3', [user.savings, user.money_on_hand, user.id])
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
    let account = await pool.query('SELECT chequing, savings, money_on_hand FROM account WHERE user_id = $1', [user.id])
    let getAccount = account.rows[0];
    if (!user) {
        res.redirect('/login')
    } else {
        res.render('withdrawal', { getAccount })  
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
                await pool.query('UPDATE account SET chequing = $1, money_on_hand = $2 WHERE user_id = $3', [user.chequing, user.money_on_hand, user.id])
                res.redirect('/')

            } else {
                res.status(400).send('Not enough to withdrawal')
            }
                
        } else if (account === 'savings') {
            
            if (savings >= amount) {
                user.savings = savings - parseInt(amount);
                user.money_on_hand = money_on_hand + parseInt(amount);
                await pool.query('UPDATE account SET savings = $1, money_on_hand = $2 WHERE user_id = $3', [user.savings, user.money_on_hand, user.id])
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
            let jobs = await pool.query('SELECT job_application.*, job.*, person.id, person.job_count FROM job_application INNER JOIN job ON job_application.job_id = job.id INNER JOIN person ON job_application.user_id = person.id WHERE job_application.user_id = $1', [user.id])
            let getJobs = jobs.rows
            let ApplyButton = {};

            
            for (let i=0; i < getJobs.length; i++) {
                if (getJobs[i].hired) {
                    ApplyButton[`btn-${i}`] = false;
                } else {
                    ApplyButton[`btn-${i}`] = true;
                }
                getJobs[i].apply = ApplyButton[`btn-${i}`]
            }
            
            console.log('jobs ->', getJobs)
            res.render("jobs", { getJobs })
        }
    } catch (err) {
        console.log(err.message)
    }
})

app.post('/jobs', async(req,res) => {
    try {
        let reqBody = req.body;
        let user = req.session.user;
        let arr = [];

        for (let key in reqBody) {
            arr.push(key);
            arr.push(reqBody[key])
        }

        let jobID = arr[0];

        user.job_count--;
        await pool.query('UPDATE job_application SET hired = $1 WHERE job_id = $2 AND user_id = $3', [false, jobID, user.id])
        await pool.query('UPDATE person SET job_count = $1 WHERE person.id = $2', [user.job_count, user.id])
        res.redirect('/jobs')

    } catch (err) {
        console.log(err.message)
    }
})

app.get('/apply/:job_id', async(req,res) => {
    try {
        let reqParams = req.params.job_id;
        let user = req.session.user;

        if (user.job_count >= 2) {
            res.send('You can not work more than 2 jobs');
        } else {
            let getJobInfo = await pool.query('SELECT job_application.*, job.id, job.job_name, person.job_count, person.id FROM job_application INNER JOIN job ON job_application.job_id = job.id INNER JOIN person ON job_application.user_id = person.id WHERE job.id = $1 AND person.id = $2', [reqParams, user.id]);
            let jobInfo = getJobInfo.rows[0]
            console.log('apply page query -->', jobInfo)
            res.render('apply', { jobInfo })
        }


    } catch (err) {
        console.log(err.message)
    }
})

app.post('/apply/:job_id', async(req,res) => {
    try {
        let user = req.session.user;
        let jobID = req.params.job_id;
        console.log('job id -->', jobID)
        let { questionTwo, questionThree } = req.body;
        if (questionTwo === 'bad-answer' || questionThree === 'bad-answer') {
            res.redirect('/jobs')
        } else {
            await pool.query('UPDATE job_application SET hired = $1 WHERE user_id = $2 AND job_id = $3', [true, user.id, jobID]);
            user.job_count++;
            await pool.query('UPDATE person SET job_count = $1 WHERE id = $2', [user.job_count, user.id]);
            res.redirect('/jobs')
        }
    } catch(err) {
        console.log(err.message)
    }
})

app.get('/work/:job_id', async(req,res) => {
    try {
        console.log('get params -->', req.params)
        const { job_id } = req.params;

        let getJobInfo = await pool.query('SELECT salary, shift FROM job WHERE id = $1', [job_id]);
        let jobInfo = getJobInfo.rows[0]

        console.log('job info -->', jobInfo)

        if (parseInt(job_id) === 1) {
            res.render('flowershop', { jobInfo } )
        } else if (parseInt(job_id) === 2) {
            res.render('burgerfactory', { jobInfo })
        } else if (parseInt(job_id) === 3) {
            res.render('counselor', { jobInfo })
        }

    } catch (err) {
        console.log(err.message)
    }

})

app.post('/work/:job_id', async(req,res) => {
    try {  
        let user = req.session.user;
        let reqBody = req.body;
        let compensation;

        for (let key in reqBody) {
            compensation = parseInt(key * reqBody[key])
        }

        console.log('savings -->', user.savings)
        console.log('compensation -->', compensation)

        await pool.query('UPDATE account SET savings = $1 WHERE user_id = $2', [user.savings += compensation, user.id]);

        res.redirect('/jobs')


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

