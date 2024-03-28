const express = require('express');
const route = express.Router();
const { getUsers, findUser, arraytoCommaSeperatedString } = require('../../controllers/insert_to_db_fr_form');

route.get('/insert_to_db_fr_form/user/:user_id', async (req, res) => {
    const user_id = +req.params.user_id;
    let users = await getUsers();
    let user = findUser(user_id, users);
    let hobbies = user.hobbies;
    res.render('insert_to_db_fr_form/user.ejs', { user, hobbies })
})

module.exports = route;