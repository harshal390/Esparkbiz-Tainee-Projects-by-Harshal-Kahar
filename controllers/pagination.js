const db = require('../config/db');

const totalRecords = async (sql) => {
    const [results, fields] = await db.query(sql);
    if (results[0].error) {
        throw new Error(rows[0].error.message);
    }
    return results.length;
}

const getStudents = async (sql, limitString, orderString) => {
    const sql_query = `${sql} ${orderString} ${limitString};`;
    const [results, fields] = await db.query(sql_query);
    if (results[0].error) {
        throw new Error(rows[0].error.message);
    }
    return results;
}

module.exports = { getStudents, totalRecords };