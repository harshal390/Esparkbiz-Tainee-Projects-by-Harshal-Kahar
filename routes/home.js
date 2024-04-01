const express = require('express');
const route = express.Router();
const { auth } = require("../middleware/auth");

route.get('/', auth, (req, res) => {
    res.render('index.ejs');
})

module.exports = route;