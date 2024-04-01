const express = require('express');
const route = express.Router();
const { insert_data } = require("../../controllers/auth/register");


route.get('/register', async (req, res) => {
    res.render('auth/register.ejs');
}).post('/registraton', async (req, res) => {
    const form_data = req.body;
    // console.log(form_data);

    try {
        const user_id = await insert_data({ ...form_data, });
        res.send({ status: true, msg: "User Register Success..!" });
    } catch (error) {
        res.send({ status: false, msg: String(error) });
    }

})

module.exports = route;