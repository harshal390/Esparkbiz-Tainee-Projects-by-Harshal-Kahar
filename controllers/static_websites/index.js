const static_website_1 = (req, res) => {
    res.render('static_website1.ejs');
}

const static_website_2 = (req, res) => {
    res.render('static_website2.ejs');
}

const static_website_3 = (req, res) => {
    res.render('static_website3.ejs');
}

module.exports = { static_website_1, static_website_2, static_website_3 }