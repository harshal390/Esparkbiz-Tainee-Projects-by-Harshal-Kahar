const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('auth/register.ejs');
}).post('/registraton', async (req, res) => {
    const form_data = req.body;
    // console.log(form_data);
    res.send( form_data );

})

module.exports = route;