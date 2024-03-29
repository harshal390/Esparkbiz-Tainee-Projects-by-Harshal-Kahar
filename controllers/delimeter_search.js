const db = require('../config/db');

const getStudents = async (sql_query) => {
    const [results, fields] = await db.query(sql_query);
    if (results[0].error) throw new Error(results[0].error.message);
    return results;
}

const sql_to_table_length = async (sql_query) => {
    const [results, fields] = await db.query(sql_query);
    if (results[0].error) throw new Error(results[0].error.message);
    return results.length;
}

module.exports = { getStudents, sql_to_table_length };