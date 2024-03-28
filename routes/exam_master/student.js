const express = require('express');
const route = express.Router();
const { object_to_keys, Table_title, sql_query_for_getStudentResult, sql_for_get_student_name, getData } = require('../../controllers/exam_master');


route.get('/exam_master/student/:student_id', async (req, res) => {
    const student_id = +req.params.student_id;
    console.log(student_id);
    let sql_query_studentResult = sql_query_for_getStudentResult(student_id);
    let sql_query_student_name = sql_for_get_student_name(student_id);

    const records_for_student_result = await getData(sql_query_studentResult);
    const student_data = await getData(sql_query_student_name);
    const student_name = student_data[0].full_name;
    const table_keys = object_to_keys(records_for_student_result[0]);
    const table_title = Table_title(records_for_student_result[0]);
    res.render('exam_master/student.ejs', { student_name, table_title, records_for_student_result, table_keys });
});
module.exports = route;