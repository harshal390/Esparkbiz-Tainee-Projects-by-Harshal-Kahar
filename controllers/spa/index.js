const renderSPA = (req, res) => {
    res.render('spa/index.ejs');
}

const renderSPApostData = (req, res) => {
    res.render('spa/post_details.ejs');
}

module.exports = { renderSPA, renderSPApostData }