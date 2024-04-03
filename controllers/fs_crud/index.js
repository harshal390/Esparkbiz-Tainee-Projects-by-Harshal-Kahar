const fs = require('fs');
const { findUser } = require("../common");

const pushUser = async (user) => {
    let unique_id = Date.now()
    let user_data = { unique_id, ...user };
    let users = await JSON.parse(fs.readFileSync('users.json', "utf-8"));
    users.push(user_data);
    let usersjson = JSON.stringify(users);
    fs.writeFileSync("users.json", usersjson, "utf-8");
    return user_data;
}

//convert hobbies comma seperated string from array
const arraytoCommaSeperatedString = array => array.join(", ");

const getBasicDetails = (req, res) => {
    res.render('crud_fs/basic_details.ejs');
}

const postBasicDetails = async (req, res) => {
    console.log(req.body);
    await pushUser(req.body);
    res.redirect('/fs_crud/users');
}

const getUser = (req, res) => {
    const user_id = +req.params.user_id;
    let usersjson = fs.readFileSync('users.json', "utf-8");
    let users = JSON.parse(usersjson);
    let user = findUser(user_id, users);
    let hobbies = arraytoCommaSeperatedString(user.hobbies);
    res.render('crud_fs/user.ejs', { user, hobbies })
}

const getUsers = (req, res) => {
    let usersjson = fs.readFileSync('users.json', "utf-8");
    let users = JSON.parse(usersjson);
    res.render('crud_fs/users.ejs', { users });
}



module.exports = { getBasicDetails, postBasicDetails, getUser, getUsers };
