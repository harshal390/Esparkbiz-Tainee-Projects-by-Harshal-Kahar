const { totalRecords, getData: getStudents } = require("../common");

const paginationGrid = async (req, res) => {
    const sql = `SELECT * FROM pagination`;
    const n = await totalRecords(sql);
    const limit = 15;
    const offset = parseInt(req.query.p) || 1;
    const limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    const order = req.query.sort === 'student_id_des' ? "DESC" : "ASC";
    const orderString = order ? `ORDER BY student_id ${order}` : ``;
    const sql_query = `${sql} ${orderString} ${limitString};`;
    const global_users = await getStudents(sql_query);
    res.render('pagination.ejs', { global_users, limit, n });
}

module.exports = { paginationGrid };