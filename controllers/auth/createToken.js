const jwt = require("jsonwebtoken");
const conf = require("../../cofig")

const createToken = (id) => {
    const { jwt_secret_key ,jwt_expire} = { ...conf };
    const token = jwt.sign({ _id: id }, jwt_secret_key, {
        expiresIn: jwt_expire,
    })
    return token;
}



module.exports = { createToken };