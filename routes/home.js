const express = require('express');
const route = express.Router();

route.get('/projects', (req, res) => {
    res.render('index.ejs');
})

module.exports =  route ;