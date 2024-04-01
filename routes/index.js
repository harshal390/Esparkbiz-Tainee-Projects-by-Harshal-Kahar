const home = require("./home");
const dynamic_table = require("./dynamic_table");
const kuku_cube = require("./kuku_cube");
const tic_tac_toe = require("./tic_tac_toe");
const static_websites = require("./static_websites");
const pagination = require("./pagination");
const attendence_master = require("./attendence_master");
const searching_by_query = require("./searching_by_query/index")
const searching_by_multiple_field = require("./searching_by_multiple_fields/index");
const delimeter_search = require("./delimeter_search/index");
const registration = require("./auth/registration");
const login = require("./auth/login");

module.exports = { home, dynamic_table, kuku_cube, tic_tac_toe, static_websites, pagination, attendence_master, searching_by_query, searching_by_multiple_field, delimeter_search, registration,login };