const express = require('express');
const route = express.Router();
const { auth } = require("../../middleware/auth");

route.get('/logout', auth, (req, res) => {
    try {
        res.clearCookie("tokenjwt");
        console.log("user logout")
        res.render('auth/login.ejs');
    } catch (error) {
        res.status(500).send(error);
    }
    
})

module.exports = route;