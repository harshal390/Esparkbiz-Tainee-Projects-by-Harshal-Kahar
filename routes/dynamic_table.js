const express = require('express');
const route = express.Router();

route.get('/dynamic_table', (req, res) => {
    res.render('dynamic_table.ejs');
})

module.exports =  route ;