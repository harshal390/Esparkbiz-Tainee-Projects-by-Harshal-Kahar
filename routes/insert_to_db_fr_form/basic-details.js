const express = require('express');
const route = express.Router();
const { pushUser } = require('../../controllers/insert_to_db_fr_form');

route.get('/insert_to_db_fr_form/basicdetails', (req, res) => {
    res.render('insert_to_db_fr_form/basic_details.ejs');
}).post('/insert_to_db_fr_form/basicdetails', async (req, res) => {
    // console.log(req.body);
    await pushUser(req.body);
    res.redirect('/insert_to_db_fr_form/users');
})

module.exports = route;