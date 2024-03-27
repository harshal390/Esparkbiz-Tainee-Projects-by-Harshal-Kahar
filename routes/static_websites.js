const express = require('express');
const route = express.Router();

route.get('/static_websites/1', (req, res) => {
    res.render('static_website1.ejs');
}).get('/static_websites/2', (req, res) => {
    res.render('static_website2.ejs');
}).get('/static_websites/3', (req, res) => {
    res.render('static_website3.ejs');
})

module.exports = route;