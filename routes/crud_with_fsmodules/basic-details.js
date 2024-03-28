const express = require('express');
const route = express.Router();
const { pushUser } = require('../../controllers/crud_fs');

route.get('/fs_crud/basicdetails', (req, res) => {
    res.render('crud_fs/basic_details.ejs');
}).post('/fs_crud/basicdetails', async (req, res) => {
    console.log(req.body);
    await pushUser(req.body);
    res.redirect('/fs_crud/users');
})

module.exports = route;