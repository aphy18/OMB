const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');

app.use(express.static('frontend'))


app.get('/', (req,res) => {
    res.render('home')
})


app.listen(port)