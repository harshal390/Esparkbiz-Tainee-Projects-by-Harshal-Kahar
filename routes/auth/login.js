const express = require('express');
const route = express.Router();
const { getUser } = require("../../controllers/auth/login")
const bcrypt = require("bcryptjs");
const { createToken } = require('../../controllers/auth/createToken');
const config = require("../../cofig");

route.get('/login', (req, res) => {
    res.render('auth/login.ejs');
}).post('/login', async (req, res) => {
    const form_data = req.body;
    const user = await getUser(form_data);
    if (!user.length) {
        console.log("invalid user_name");
        res.send({ status: false, msg: "invalid User Name or Password" });
    } else {
        console.log(user);
        const user_password = user[0].password;
        const ismatch = await bcrypt.compare(form_data.password, user_password);
        if (!ismatch) {
            res.send({ status: false, msg: "invalid User Name or Password" });
        }
        else {
            const user_id = user[0].user_id
            const token = createToken(user_id);
            // console.log(token);
            const options = {
                // expires: new Date(Date.now() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000) + config.cookie_expire * 60 * 60 * 1000),
                expires: new Date(Date.now() + config.cookie_expire * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("tokenjwt", token, options).send({ status: true, msg: "valid username", user: user[0] });
        }
    }

})

module.exports = route;