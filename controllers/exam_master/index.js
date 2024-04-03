const { objectToKeys, tableTitle, getData } = require("../common");


const query_for_entire_records = `select
student_id,
student_name,
student_surname,
CONCAT(terminal_theory, "/", terminal_theory_total) as Terminal_theory,
CONCAT(terminal_practical, "/", terminal_practical_total) as Terminal_practical,
CONCAT(prelims_theory, "/", prelims_theory_total) as Prelims_therory,
CONCAT(prelims_practical, "/", prelims_practical_total) as Prelims_practical,
CONCAT(final_theory, "/", final_theory_total) as Final_theory,
CONCAT(final_practical, "/", final_practical_total) as Final_practical,
CONCAT(total_theory, "/", total_theory_total) as Overall_theory,
CONCAT(total_practical, "/", total_practical_total) as Overall_practical,
CONCAT((total_theory + total_practical), "/", (total_theory_total + total_practical_total)) as Overall_total
FROM
(
    select
        student_id,
        student_name,
        student_surname,
        terminal_theory,
        terminal_practical,
        prelims_theory,
        prelims_practical,
        final_theory,
        final_practical,
        terminal_theory_total,
        terminal_practical_total,
        prelims_theory_total,
        prelims_practical_total,
        final_theory_total,
        final_practical_total,
        (terminal_theory + prelims_theory + final_theory) as total_theory,
        (
            terminal_practical + prelims_practical + final_practical
        ) as total_practical,
        (
            terminal_theory_total + prelims_theory_total + final_theory_total
        ) as total_theory_total,
        (
            terminal_practical_total + prelims_practical_total + final_practical_total
        ) as total_practical_total
    FROM
        (
            select
                student_master.student_id as student_id,
                student_name,
                student_surname,
                sum(
                    if(exam_type = "terminal", obtained_theory_marks, 0)
                ) as terminal_theory,
                sum(
                    if(
                        exam_type = "terminal",
                        obtained_practical_marks,
                        0
                    )
                ) as terminal_practical,
                sum(
                    if(exam_type = "prelims", obtained_theory_marks, 0)
                ) as prelims_theory,
                sum(
                    if(
                        exam_type = "prelims",
                        obtained_practical_marks,
                        0
                    )
                ) as prelims_practical,
                sum(
                    if(exam_type = "final", obtained_theory_marks, 0)
                ) as final_theory,
                sum(
                    if(exam_type = "final", obtained_practical_marks, 0)
                ) as final_practical,
                sum(
                    if(exam_type = "terminal", total_theory_marks, 0)
                ) as terminal_theory_total,
                sum(
                    if(exam_type = "terminal", total_practical_marks, 0)
                ) as terminal_practical_total,
                sum(if(exam_type = "prelims", total_theory_marks, 0)) as prelims_theory_total,
                sum(
                    if(exam_type = "prelims", total_practical_marks, 0)
                ) as prelims_practical_total,
                sum(if(exam_type = "final", total_theory_marks, 0)) as final_theory_total,
                sum(
                    if(exam_type = "final", total_practical_marks, 0)
                ) as final_practical_total
            FROM subject_master
                JOIN exam_master ON exam_master.subject_id = subject_master.subject_id
                JOIN student_master ON exam_master.student_id = student_master.student_id
            GROUP BY
                student_master.student_id
        ) AS result_view
) AS final_result_view;`;

const sql_query_for_pagination = (limitString) => {
    return `select
    student_id,
    student_name,
    student_surname,
    CONCAT(terminal_theory, "/", terminal_theory_total) as Terminal_theory,
    CONCAT(terminal_practical, "/", terminal_practical_total) as Terminal_practical,
    CONCAT(prelims_theory, "/", prelims_theory_total) as Prelims_therory,
    CONCAT(prelims_practical, "/", prelims_practical_total) as Prelims_practical,
    CONCAT(final_theory, "/", final_theory_total) as Final_theory,
    CONCAT(final_practical, "/", final_practical_total) as Final_practical,
    CONCAT(total_theory, "/", total_theory_total) as Overall_theory,
    CONCAT(total_practical, "/", total_practical_total) as Overall_practical,
    CONCAT((total_theory + total_practical), "/", (total_theory_total + total_practical_total)) as Overall_total
FROM
(
        select
            student_id,
            student_name,
            student_surname,
            terminal_theory,
            terminal_practical,
            prelims_theory,
            prelims_practical,
            final_theory,
            final_practical,
            terminal_theory_total,
            terminal_practical_total,
            prelims_theory_total,
            prelims_practical_total,
            final_theory_total,
            final_practical_total,
            (terminal_theory + prelims_theory + final_theory) as total_theory,
            (
                terminal_practical + prelims_practical + final_practical
            ) as total_practical,
            (
                terminal_theory_total + prelims_theory_total + final_theory_total
            ) as total_theory_total,
            (
                terminal_practical_total + prelims_practical_total + final_practical_total
            ) as total_practical_total
        FROM
            (
                select
                    student_master.student_id as student_id,
                    student_name,
                    student_surname,
                    sum(
                        if(exam_type = "terminal", obtained_theory_marks, 0)
                    ) as terminal_theory,
                    sum(
                        if(
                            exam_type = "terminal",
                            obtained_practical_marks,
                            0
                        )
                    ) as terminal_practical,
                    sum(
                        if(exam_type = "prelims", obtained_theory_marks, 0)
                    ) as prelims_theory,
                    sum(
                        if(
                            exam_type = "prelims",
                            obtained_practical_marks,
                            0
                        )
                    ) as prelims_practical,
                    sum(
                        if(exam_type = "final", obtained_theory_marks, 0)
                    ) as final_theory,
                    sum(
                        if(exam_type = "final", obtained_practical_marks, 0)
                    ) as final_practical,
                    sum(
                        if(exam_type = "terminal", total_theory_marks, 0)
                    ) as terminal_theory_total,
                    sum(
                        if(exam_type = "terminal", total_practical_marks, 0)
                    ) as terminal_practical_total,
                    sum(if(exam_type = "prelims", total_theory_marks, 0)) as prelims_theory_total,
                    sum(
                        if(exam_type = "prelims", total_practical_marks, 0)
                    ) as prelims_practical_total,
                    sum(if(exam_type = "final", total_theory_marks, 0)) as final_theory_total,
                    sum(
                        if(exam_type = "final", total_practical_marks, 0)
                    ) as final_practical_total
                FROM subject_master
                    JOIN exam_master ON exam_master.subject_id = subject_master.subject_id
                    JOIN student_master ON exam_master.student_id = student_master.student_id
                GROUP BY
                    student_master.student_id ${limitString}
            ) AS result_view
    ) AS final_result_view;`;

}

const sql_query_for_getStudentResult = (student_id) => {
    return `select
    subject_name,
    CONCAT(terminal_theory, "/", terminal_theory_total) as Terminal_theory,
    CONCAT(terminal_practical, "/", terminal_practical_total) as Terminal_practical,
    CONCAT(prelims_theory, "/", prelims_theory_total) as Prelims_therory,
    CONCAT(prelims_practical, "/", prelims_practical_total) as Prelims_practical,
    CONCAT(final_theory, "/", final_theory_total) as Final_theory,
    CONCAT(final_practical, "/", final_practical_total) as Final_practical,
    CONCAT(total_theory, "/", total_theory_total) as Overall_theory,
    CONCAT(total_practical, "/", total_practical_total) as Overall_practical,
    CONCAT((total_theory + total_practical), "/", (total_theory_total + total_practical_total)) as Overall_total
FROM
(
        select 
            subject_name,
            terminal_theory,
            terminal_practical,
            prelims_theory,
            prelims_practical,
            final_theory,
            final_practical,
            terminal_theory_total,
            terminal_practical_total,
            prelims_theory_total,
            prelims_practical_total,
            final_theory_total,
            final_practical_total,
            (terminal_theory + prelims_theory + final_theory) as total_theory,
            (
                terminal_practical + prelims_practical + final_practical
            ) as total_practical,
            (
                terminal_theory_total + prelims_theory_total + final_theory_total
            ) as total_theory_total,
            (
                terminal_practical_total + prelims_practical_total + final_practical_total
            ) as total_practical_total
        FROM
            (
                select
                    student_master.student_id as student_id,
                    subject_name,
                    sum(
                        if(exam_type = "terminal", obtained_theory_marks, 0)
                    ) as terminal_theory,
                    sum(
                        if(
                            exam_type = "terminal",
                            obtained_practical_marks,
                            0
                        )
                    ) as terminal_practical,
                    sum(
                        if(exam_type = "prelims", obtained_theory_marks, 0)
                    ) as prelims_theory,
                    sum(
                        if(
                            exam_type = "prelims",
                            obtained_practical_marks,
                            0
                        )
                    ) as prelims_practical,
                    sum(
                        if(exam_type = "final", obtained_theory_marks, 0)
                    ) as final_theory,
                    sum(
                        if(exam_type = "final", obtained_practical_marks, 0)
                    ) as final_practical,
                    sum(
                        if(exam_type = "terminal", total_theory_marks, 0)
                    ) as terminal_theory_total,
                    sum(
                        if(exam_type = "terminal", total_practical_marks, 0)
                    ) as terminal_practical_total,
                    sum(if(exam_type = "prelims", total_theory_marks, 0)) as prelims_theory_total,
                    sum(
                        if(exam_type = "prelims", total_practical_marks, 0)
                    ) as prelims_practical_total,
                    sum(if(exam_type = "final", total_theory_marks, 0)) as final_theory_total,
                    sum(
                        if(exam_type = "final", total_practical_marks, 0)
                    ) as final_practical_total
                FROM subject_master
                    JOIN exam_master ON exam_master.subject_id = subject_master.subject_id
                    JOIN student_master ON exam_master.student_id = student_master.student_id and student_master.student_id=${student_id}
                GROUP BY
                    subject_master.subject_id
            ) AS result_view
    ) AS final_result_view;`;
};

const sql_for_get_student_name = (student_id) => {
    return `select
    CONCAT(student_name," ",student_surname) as full_name
FROM
    subject_master
    JOIN exam_master ON exam_master.subject_id = subject_master.subject_id
    JOIN student_master ON exam_master.student_id = student_master.student_id
where
    student_master.student_id = ${student_id}
    GROUP BY student_master.student_name;`
};


const examMasterGrid = async (req, res) => {
    let limit = 11;
    let offset = parseInt(req.query.p) || 1;
    let limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    let sql_query_entire_record = query_for_entire_records;
    let sql_query = sql_query_for_pagination(limitString);

    const records = await getData(sql_query);
    const entire_records = await getData(sql_query_entire_record);
    const n = entire_records.length;
    let table_keys = objectToKeys(records[0]);
    let table_title = tableTitle(records[0]);
    res.render('exam_master/index.ejs', { table_title, records, table_keys, n, limit });
}

const getStudentDetails = async (req, res) => {
    const student_id = +req.params.student_id;
    console.log(student_id);
    let sql_query_studentResult = sql_query_for_getStudentResult(student_id);
    let sql_query_student_name = sql_for_get_student_name(student_id);

    const records_for_student_result = await getData(sql_query_studentResult);
    const student_data = await getData(sql_query_student_name);
    const student_name = student_data[0].full_name;
    const table_keys = objectToKeys(records_for_student_result[0]);
    const table_title = tableTitle(records_for_student_result[0]);
    res.render('exam_master/student.ejs', { student_name, table_title, records_for_student_result, table_keys });
}

module.exports = { examMasterGrid, getStudentDetails }