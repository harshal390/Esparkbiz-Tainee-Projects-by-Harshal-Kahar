const { getData: getUsers,findUser } = require("../common");
const db =require("../../config/db");


const pushUser = async ({ ...user }) => {
    let unique_id = Date.now();
    const { first_name, last_name, age, email, phone_number, address, hobbies, gender } = user;
    let user_data = { unique_id, ...user };
    // console.log(hobbies);
    let sql = `INSERT INTO insert_to_db_from_form (unique_id,first_name, last_name, age,email,phone_number,address,hobbies,gender, reg_date) VALUES ("${unique_id}", "${first_name}", "${last_name}","${age}","${email}","${phone_number}","${address}","${hobbies}","${gender}", NOW());`
    // console.log(sql);
    const results = await db.query(sql);
    if (results[0].error) throw new Error(results[0].error.message);
    console.log("user pushed...")
    return user_data;
}

const insertIntoBasicDetails = (req, res) => {
    res.render('insert_to_db_fr_form/basic_details.ejs');
}

const insertUserIntoBasicDetails = async (req, res) => {
    // console.log(req.body);
    try {
        await pushUser(req.body);
        res.redirect('/insert_to_db_fr_form/users');
    } catch (error) {
        console.log(error);
    }
}

const getUsersFromBasicDetails = async (req, res) => {
    const sql = `SELECT * FROM insert_to_db_from_form;`;
    try {
        let users = await getUsers(sql);
        res.render('insert_to_db_fr_form/users.ejs', { users });
    } catch (error) {
        console.log(error);
    }
}

const getUserFromBasicDetails = async (req, res) => {
    const sql = `SELECT * FROM insert_to_db_from_form;`;
    const user_id = +req.params.user_id;
    try {
        let users = await getUsers(sql);
        let user = findUser(user_id, users);
        let hobbies = user.hobbies;
        res.render('insert_to_db_fr_form/user.ejs', { user, hobbies })
    } catch (error) {
        console.log(error);
    }
}



module.exports = { insertIntoBasicDetails, insertUserIntoBasicDetails, getUsersFromBasicDetails, getUserFromBasicDetails };
