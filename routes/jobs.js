const express = require('express');
const router = express.Router();
const pool = require('../db/db');


router.get('/', async (req, res) => {
    try {
        let user = req.session.user;
        if (!user) {
            res.redirect('/login');
        } else {
            let jobs = await pool.query('SELECT job_application.*, job.*, person.id, person.job_count FROM job_application INNER JOIN job ON job_application.job_id = job.id INNER JOIN person ON job_application.user_id = person.id WHERE job_application.user_id = $1', [user.id]);
            let getJobs = jobs.rows;
            let ApplyButton = {};

            
            for (let i=0; i < getJobs.length; i++) {
                if (getJobs[i].hired) {
                    ApplyButton[`btn-${i}`] = false;
                } else {
                    ApplyButton[`btn-${i}`] = true;
                }
                getJobs[i].apply = ApplyButton[`btn-${i}`]
            }
            res.render("jobs", { getJobs })
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.post('/', async(req,res) => {
    try {
        let reqBody = req.body;
        let user = req.session.user;
        let arr = [];

        for (let key in reqBody) {
            arr.push(key);
            arr.push(reqBody[key]);
        }

        let jobID = arr[0];

        user.job_count--;
        await pool.query('UPDATE job_application SET hired = $1 WHERE job_id = $2 AND user_id = $3', [false, jobID, user.id]);
        await pool.query('UPDATE person SET job_count = $1 WHERE person.id = $2', [user.job_count, user.id]);
        res.redirect('/jobs');

    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router;