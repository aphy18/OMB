const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/work/:job_id', async(req,res) => {
    try {
        const { job_id } = req.params;
        let getJobInfo = await pool.query('SELECT salary, shift FROM job WHERE id = $1', [job_id]);
        let jobInfo = getJobInfo.rows[0];

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

router.post('/work/:job_id', async(req,res) => {
    try {  
        let user = req.session.user;
        let reqBody = req.body;
        let compensation;

        for (let key in reqBody) {
            compensation = parseInt(key * reqBody[key]);
        }

        await pool.query('UPDATE account SET savings = $1 WHERE user_id = $2', [user.savings += compensation, user.id]);
        res.redirect('/jobs');
    
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;