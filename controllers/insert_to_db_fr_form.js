const db = require('../config/db');


const getUsers = async () => {
    let sql = `SELECT * FROM insert_to_db_from_form;`;
    try {
        const [results, fields] = await db.query(sql);
        return results;
    } catch (error) {
        return error;
    }
}

const pushUser = async ({ ...user }) => {
    let unique_id = Date.now();
    const { first_name, last_name, age, email, phone_number, address, hobbies, gender } = user;
    let user_data = { unique_id, ...user };
    // console.log(hobbies);
    let sql = `INSERT INTO insert_to_db_from_form (unique_id,first_name, last_name, age,email,phone_number,address,hobbies,gender, reg_date) VALUES ("${unique_id}", "${first_name}", "${last_name}","${age}","${email}","${phone_number}","${address}","${hobbies}","${gender}", NOW());`
    console.log(sql);
    const [results, fields] = await db.query(sql);
    if (results[0].error) {
        throw new Error(rows[0].error.message);
    }
    console.log("user pushed...")
    return user_data;

}

const findUser = (user_id, users) => users.filter(ele => +ele.unique_id === user_id)[0];

//convert hobbies comma seperated string from array
const arraytoCommaSeperatedString = array => array.join(", ");



module.exports = { getUsers, pushUser, findUser, arraytoCommaSeperatedString };
