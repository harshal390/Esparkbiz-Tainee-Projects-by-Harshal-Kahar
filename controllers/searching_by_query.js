const db = require('../config/db');
const object_to_keys = (obj) => {
    let keys = [];
    for (let i in obj) keys.push(i);
    // for (let i in obj) keys.push(i.charAt(0).toUpperCase()+i.replaceAll("_",' ').slice(1));
    return keys;
}

const Table_title = (obj) => {
    let keys = [];
    for (let i in obj) keys.push(i.charAt(0).toUpperCase() + i.replaceAll("_", ' ').slice(1));
    return keys;
}

const getData = async (sql) => {
    const [results, fields] = await db.query(sql);
    if (results[0].error) { // don't know your exception as json object structure, change check here based on what is expected in case of the error
        throw new Error(results[0].error.message);
     } 
    // console.log(sql);
    return results;
}
module.exports = { object_to_keys, Table_title, getData };