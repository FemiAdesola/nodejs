const express = require('express');
const router = express.Router();


// Get all team
router.get('/', (req, res) => {
    res.render('index');
});

module.exports=router