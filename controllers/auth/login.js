const db = require("../../config/db");


const getUser = async (form_data) => {
    const { user_name, password } = { ...form_data }
    const sql_query = `select * from registration where user_name=?`
    const results = await db.query(sql_query, [user_name]);
    if (results[0].error) throw new Error(results[0].error.message);
    return results[0];
}

module.exports = { getUser };