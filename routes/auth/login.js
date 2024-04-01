const express = require('express');
const route = express.Router();

route.get('/login', (req, res) => {
    res.render('auth/login.ejs');
})

module.exports =  route ;