const express = require('express');
const route = express.Router();
const { getUsers, findUser, arraytoCommaSeperatedString } = require('../../controllers/crud_fs');

route.get('/fs_crud/user/:user_id', (req, res) => {
    const user_id = +req.params.user_id;
    let users = getUsers();

    let user = findUser(user_id, users);
    let hobbies = arraytoCommaSeperatedString(user.hobbies);

    res.render('crud_fs/user.ejs', { user, hobbies })
})

module.exports = route;