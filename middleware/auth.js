const jwt = require("jsonwebtoken");
const config = require("../cofig");
const db = require("../config/db");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.tokenjwt;
        const verifyUser = jwt.verify(token, config.jwt_secret_key)
        // console.log(verifyUser, verifyUser._id);
        const user_id = verifyUser._id;
        const sql_query = `select * from registration where user_id=?`
        const results = await db.query(sql_query, [user_id]);
        if (results[0].error) throw new Error(results[0].error.message);
        console.log(results[0][0]);
        next();
    } catch (error) {
        res.render("404/index.ejs");
    }
}

module.exports = { auth };