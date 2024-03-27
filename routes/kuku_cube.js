const express = require('express');
const route = express.Router();

route.get('/kuku_cube', (req, res) => {
    res.render('kuku_cube.ejs');
})

module.exports =  route ;