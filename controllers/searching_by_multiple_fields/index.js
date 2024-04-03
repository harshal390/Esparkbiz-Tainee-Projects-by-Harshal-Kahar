const errorHandler = require("../../controllers/error/error_handler");
const { getData: getStudents } = require("../common")

const searchingByMultipleFieldsGrid = async (req, res) => {
    let sql = `SELECT * FROM student_master;`;
    try {
        const local_users = await getStudents(sql);
        res.render('searching_by_multiple_field/index.ejs', { local_users });
    } catch (err) {
        const error = { ejsFile: 'searching_by_multiple_field/index.ejs', error: err }
        errorHandler(error, res);
    }
}

const postSearchingByMultipleFields = async (req, res) => {
    let body = req.body;
    if ("student_id" in body) {
        const { student_id } = { ...body };
        let searchingString = `where student_id IN(${student_id})`;
        let sql = `SELECT * FROM student_master`;
        let main_sql = `${sql} ${searchingString} ;`
        try {
            let local_users = await getStudents(main_sql);
            res.render('searching_by_multiple_field/index.ejs', { local_users });
        } catch (err) {
            const error = { ejsFile: 'searching_by_multiple_field/index.ejs', error: err }
            errorHandler(error, res);
        }
    }
    else {
        const { student_name, student_surname, student_mobile, student_location, student_gender, student_age, operator } = { ...body };
        let searchingString = `where student_name LIKE "${student_name}" ${operator} student_surname LIKE "${student_surname}" ${operator} student_mobile LIKE "${student_mobile}" ${operator} student_location LIKE "${student_location}" ${operator} student_gender LIKE "${student_gender}" ${operator} student_age LIKE "${student_age}"`;
        let sql = `SELECT * FROM student_master`;
        let main_sql = `${sql} ${searchingString} ;`
        try {
            let local_users = await getStudents(main_sql);
            res.render('searching_by_multiple_field/index.ejs', { local_users });
        } catch (err) {
            const error = { ejsFile: 'searching_by_multiple_field/index.ejs', error: err }
            errorHandler(error, res);
        }
    }
}
module.exports = { searchingByMultipleFieldsGrid, postSearchingByMultipleFields };