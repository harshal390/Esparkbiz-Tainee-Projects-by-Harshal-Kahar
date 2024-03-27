const express = require('express');
const route = express.Router();

route.get('/tic_tac_toe', (req, res) => {
    res.render('tic_tac_toe.ejs');
})

module.exports =  route ;