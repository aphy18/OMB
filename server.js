const express = require('express');
const app = express();
const port = 8080;
const pool = require('./db/db')

app.use(express.json()) // req.body

app.set('view engine', 'ejs');

app.get('/', async (req,res) => {
    try {
        const person = await pool.query('SELECT * FROM person WHERE id = 2')
        let personObj = person.rows[0];
        res.render('home', { personObj } )
        console.log('person -->', person)
        console.log('person rows 0 -->', person.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})

app.get('/deadend', async (req,res) => {
    res.status(400).send('nothing past here')
})

app.get('/test', async (req,res) => {
    let student = {
        name: 'Aphy',
        age: 20,
        grades: ['A','B','c']
    }
    res.render('test', { student })
})


app.listen(port)