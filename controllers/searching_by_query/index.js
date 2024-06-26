const errorHandler = require("../../controllers/error/error_handler");
const { objectToKeys, tableTitle, getData } = require("../common");

const postSearchByQuery = async (req, res) => {
    let query = req.body.table_query;
    // console.log(query.slice(0, -1));
    let limit = 11;
    let offset = parseInt(req.query.p) || 1;
    // console.log(offset);
    let order = req.query.sort;
    let orderArray = order ? order.split("__") : "__";
    // console.log(orderArray);
    let order_id = orderArray[0];
    let order_by = orderArray[1].toUpperCase();
    // console.log(order_id, order_by);

    let limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    let orderString = order ? `ORDER BY ${order_id} ${order_by}` : "";
    let query_by_pagination = `${query.slice(0, -1)} ${orderString} ${limitString};`
    // console.log(query_by_pagination);
    try {
        const entire_data = await getData(query);
        const n = entire_data.length;
        const records = await getData(query_by_pagination);
        const table_keys = objectToKeys(records[0]);
        const table_title = tableTitle(records[0]);
        res.render('searching_by_query/index.ejs', { records, table_keys, table_title, n, limit, query });
    } catch (err) {
        const error = { ejsFile: 'searching_by_query/index.ejs', error: err }
        errorHandler(error, res);
    }

}

const getGridOfSearchByQuery = async (req, res) => {
    let query = (req.query.query) || 'select * from student_master;';
    console.log(query.slice(0, -1));
    let limit = 11;
    let offset = parseInt(req.query.p) || 1;
    // console.log(offset);
    let order = req.query.sort;
    let orderArray = order ? order.split("__") : "__";
    let order_id = orderArray[0];
    let order_by = orderArray[1].toUpperCase();
    console.log(order_id, order_by);
    let limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    let orderString = order ? `ORDER BY ${order_id} ${order_by}` : "";
    let query_by_pagination = `${query.slice(0, -1)} ${orderString} ${limitString};`
    console.log(query_by_pagination);
    try {
        const entire_data = await getData(query);
        const n = entire_data.length;
        const records = await getData(query_by_pagination);
        const table_keys = objectToKeys(records[0]);
        const table_title = tableTitle(records[0]);
        res.render('searching_by_query/index.ejs', { records, table_keys, table_title, n, limit, query });
    } catch (err) {
        const error = { ejsFile: 'searching_by_query/index.ejs', error: err }
        errorHandler(error, res);
    }
}
module.exports = { postSearchByQuery, getGridOfSearchByQuery };