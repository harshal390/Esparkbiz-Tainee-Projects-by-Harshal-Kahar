const db = require("../../config/db");
const bcrypt = require("bcryptjs");

const insert_data = async (form_data) => {
    const sql_query = `INSERT INTO registration (full_name,user_name,email,mobile_number,gender,password) VALUES (?, ?, ?, ?, ?, ?)`;
    const { full_name, user_name, email, mobile_number, gender, password } = { ...form_data };
    const pass = await bcrypt.hash(password, 10)
    // console.log(pass);
    const results = await db.query(sql_query, [full_name, user_name, email, mobile_number, gender, pass]);
    if (results[0].error) throw new Error(results[0].error.message);
    console.log(`User Register Successful at ${results[0].insertId}`);
    return results[0].insertId;
}

const getRegistration = async (req, res) => {
    res.render('auth/register.ejs');
}

const postRegistration = async (req, res) => {
    const form_data = req.body;
    // console.log(form_data);
    try {
        const user_id = await insert_data({ ...form_data, });
        res.send({ status: true, msg: "User Register Success..!" });
    } catch (error) {
        res.send({ status: false, msg: String(error) });
    }
}

module.exports = { getRegistration, postRegistration }