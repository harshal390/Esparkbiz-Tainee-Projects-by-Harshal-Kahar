const dotenv = require('dotenv');
dotenv.config();

const conf = {
    mysql_user:String(process.env.mysql_user),
    mysql_password: String(process.env.MYSQL_PASSWORD),
    mysql_database: String(process.env.MYSQL_DATABASE),
    port: String(process.env.PORT),
    get host() {
        return `http://localhost:${t+his.port}`;
    }
}
console.log(conf);
module.exports = conf;