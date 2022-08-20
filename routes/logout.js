const express = require('express');
const router = express.Router();

router.get('/logout', (req,res) => {
    req.session.user = null;
})

module.exports = router;