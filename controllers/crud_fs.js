const fs = require('fs');

const getUsers = () => {
    let usersjson = fs.readFileSync('users.json', "utf-8");
    let users = JSON.parse(usersjson);
    return users;
}

const pushUser = async (user) => {
    let unique_id = Date.now()
    let user_data = { unique_id, ...user };
    let users = await JSON.parse(fs.readFileSync('users.json', "utf-8"));
    users.push(user_data);
    let usersjson = JSON.stringify(users);
    fs.writeFileSync("users.json", usersjson, "utf-8");
    return user_data;
}

const findUser = (user_id, users) => users.filter(ele => ele.unique_id === user_id)[0];

//convert hobbies comma seperated string from array
const arraytoCommaSeperatedString = array => array.join(", ");



module.exports = { getUsers, pushUser, findUser, arraytoCommaSeperatedString };
