const dotenv = require('dotenv');
dotenv.config();

const conf = {
    mysql_user: String(process.env.MYSQL_USER),
    mysql_password: String(process.env.MYSQL_PASSWORD),
    mysql_database: String(process.env.MYSQL_DATABASE),
    port: String(process.env.PORT),
    jwt_secret_key: String(process.env.JWT_SECRET_KEY),
    jwt_expire: String(process.env.JWT_EXPIRE),
    cookie_expire: parseInt(process.env.COOKIE_EXPIRE)
}
// console.log(conf);
module.exports = conf;