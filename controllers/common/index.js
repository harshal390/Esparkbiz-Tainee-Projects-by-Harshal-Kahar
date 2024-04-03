const db = require('../../config/db');


const objectToKeys = (obj) => {
    let keys = [];
    for (let i in obj) keys.push(i);
    return keys;
}
const tableTitle = (obj) => {
    let keys = [];
    for (let i in obj) keys.push(i.charAt(0).toUpperCase() + i.replaceAll("_", ' ').slice(1));
    return keys;
}
const getData = async (sql) => {
    const results = await db.query(sql);
    if (results[0].error) { // don't know your exception as json object structure, change check here based on what is expected in case of the error
        throw new Error(results[0].error.message);
     } 
    // console.log(sql);
    return results[0];
}
const totalRecords = async (sql) => {
    const results = await db.query(sql);
    if (results[0].error) throw new Error(rows[0].error.message);
    return results[0].length;
}
const findUser = (user_id, users) => users.filter(ele => +ele.unique_id === user_id)[0];

module.exports = { objectToKeys, tableTitle,getData,totalRecords,findUser };