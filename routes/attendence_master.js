const express = require('express');
const route = express.Router();
const { object_to_keys, Table_title, getData } = require('../controllers/attendence_master');


route.get('/attendence_master', async (req, res) => {

    let limit = 11;
    let offset = parseInt(req.query.p) || 1;
    let month_year = req.query.month_year ? req.query.month_year.split("_") : [];
    let month = month_year[0] ? month_year[0] : "%";
    let year = month_year[1] ? month_year[1] : "%";
    // console.log(month, year);
    let limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    let filterString = `and attendence_date like "${year}-${month}-%"`;
    let sql_query_entire_record = `select student_master.student_id,CONCAT(student_name," ",student_surname) as student_full_name,student_mobile,student_location,student_gender,sum(attendence)as attendence,count(attendence) as total_days,CONCAT(ROUND(sum(attendence)/count(attendence)*100, 2)," %") as percentage from student_master join attendence_master on student_master.student_id = attendence_master.student_id GROUP BY student_id;`;

    let sql_query = `select student_master.student_id,CONCAT(student_name," ",student_surname) as student_full_name,student_mobile,student_location,student_gender,sum(attendence)as attendence,count(attendence) as total_days,CONCAT(ROUND(sum(attendence)/count(attendence)*100, 2)," %") as percentage from student_master join attendence_master on student_master.student_id = attendence_master.student_id ${filterString} GROUP BY student_id ${limitString} ;`;

    const entire_data = await getData(sql_query_entire_record);
    const n = entire_data.length;
    const students = await getData(sql_query);
    let table_keys = object_to_keys(students[0]);
    let table_title = Table_title(students[0]);

    res.render('attendence_master/index.ejs', { table_title, students, table_keys, n, limit });
})

module.exports = route;