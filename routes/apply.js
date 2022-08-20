const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/apply/:job_id', async(req,res) => {
    try {
        let reqParams = req.params.job_id;
        let user = req.session.user;

        console.log('req params -->', reqParams)

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

router.post('/apply/:job_id', async(req,res) => {
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

module.exports = router;