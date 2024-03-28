const express = require('express');
const route = express.Router();
const { getUsers } = require('../../controllers/crud_fs');


route.get('/fs_crud/users', (req, res) => {
    let users = getUsers();
    res.render('crud_fs/users.ejs', { users });
})


module.exports = route;