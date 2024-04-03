const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const { createToken } = require('./createToken');
const config = require("../../cofig");

const getUser = async (form_data) => {
    const { user_name, password } = { ...form_data }
    const sql_query = `select * from registration where user_name=?`
    const results = await db.query(sql_query, [user_name]);
    if (results[0].error) throw new Error(results[0].error.message);
    return results[0];
}

const getLogin = (req, res) => {
    res.render('auth/login.ejs');
}

const postLogin = async (req, res) => {
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

}

module.exports = { getLogin, postLogin };