const express = require('express');
const route = express.Router();
const { getStudents } = require('../../controllers/delimeter_search');

route.get('/delimeter_search', async (req, res) => {
    let main_sql = `SELECT * FROM student_master;`;
    try {
        let local_users = await getStudents(main_sql);
        res.render('delimeter_search/index.ejs', { local_users });
    } catch (error) {
        res.render('delimeter_search/index.ejs', { err: error.toString().slice(5, -1) });
    }

}).post('/delimeter_search', async (req, res) => {
    let query1 = req.body.query;
    let index_array = [];
    let resObject = {};
    const myMap = {
        "_": "student_name",
        "^": "student_surname",
        "$": "student_mobile",
        "}": "student_location",
        "{": "student_age",
        ":": "student_gender"
    }

    for (let i = 0; i < query1.length; i++) {
        if (query1[i] === "_") {
            index_array.push(i);
            resObject.student_name = [];
        }
        else if (query1[i] === "^") {
            index_array.push(i);
            resObject.student_surname = [];
        }
        else if (query1[i] === "$") {
            index_array.push(i);
            resObject.student_mobile = [];

        } else if (query1[i] === "}") {
            index_array.push(i);
            resObject.student_location = [];
        }
        else if (query1[i] === "{") {
            index_array.push(i);
            resObject.student_age = [];
        }
        else if (query1[i] === ":") {
            index_array.push(i);
            resObject.student_gender = [];
        }
        else {
            // console.log("else part called...");
        }
    }

    index_array.map((ele, index) => {
        //to find position of the query1 (string);
        resObject[myMap[query1[ele]]].push(query1.slice(index_array[index] + 1, index_array[index + 1]));
    })

    let sql = `select * from student_master ;`
    let sql_2 = ``;

    Object.entries(resObject).map((entry, index) => {
        let key = entry[0];
        let value = entry[1];
        let sql_part = ``;
        let res_obj_length = Object.keys(resObject).length;

        // console.log(value.length);
        if (value.length === 0) {
            sql_part = ``;
        }
        else if (value.length === 1) {
            sql_part = ``;
            sql_one = ` ${key} LIKE "${value}%" ${index !== res_obj_length - 1 ? "AND" : ""} `;
            sql_part += sql_one;
        }
        else {
            console.log(value);
            let string_value = value.map((ele) => `"${ele}"`);
            sql_part = ``;
            sql_two = ` ${key} IN (${string_value}) ${index !== res_obj_length - 1 ? "AND" : ""} `;
            sql_part += sql_two;
            // console.log(sql_part);
        }
        sql_2 += sql_part;
    });

    // console.log(`${sql.slice(0, -1)} where ${sql_2};`);
    let main_sql = query1.length ? `${sql.slice(0, -1)} where ${sql_2};` : `${sql}`;
    console.log(main_sql);
    try {
        let local_users = await getStudents(main_sql);
        res.render('delimeter_search/index.ejs', { local_users });
    } catch (error) {
        res.render('delimeter_search/index.ejs', { err: error.toString().slice(5, -1) });
    }
})
module.exports = route;