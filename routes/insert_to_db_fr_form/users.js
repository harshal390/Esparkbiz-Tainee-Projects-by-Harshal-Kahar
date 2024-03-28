const express = require('express');
const route = express.Router();
const { getUsers } = require('../../controllers/insert_to_db_fr_form');


route.get('/insert_to_db_fr_form/users', async (req, res) => {
    let users = await getUsers();
    console.log(users);
    res.render('insert_to_db_fr_form/users.ejs', { users });
})


module.exports = route;