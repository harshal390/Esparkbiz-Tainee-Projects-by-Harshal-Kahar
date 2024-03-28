const express = require('express');
const route = express.Router();
const { object_to_keys, Table_title, query_for_entire_records, sql_query_for_pagination, getData } = require('../../controllers/exam_master');


route.get('/exam_master', async (req, res) => {
    let limit = 11;
    let offset = parseInt(req.query.p) || 1;
    let limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    let sql_query_entire_record = query_for_entire_records;
    let sql_query = sql_query_for_pagination(limitString);

    
    const records = await getData(sql_query);
    const entire_records = await getData(sql_query_entire_record);
    const n = entire_records.length;
    let table_keys = object_to_keys(records[0]);
    let table_title = Table_title(records[0]);
    res.render('exam_master/index.ejs', { table_title, records, table_keys, n, limit });
})

module.exports = route;