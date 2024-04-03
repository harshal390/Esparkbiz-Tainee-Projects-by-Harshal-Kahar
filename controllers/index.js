const { home } = require("./home");
const { dynamic_table } = require("./dynamic_table");
const { kuku_cube } = require("./kuku_cube");
const { tic_tac_toe } = require("./tic_tac_toe")
const { static_website_1, static_website_2, static_website_3 } = require("./static_websites")
const { getLogin, postLogin } = require("./auth/login");
const { logOut } = require("./auth/logout");
const { getRegistration, postRegistration } = require("./auth/register");
const { getBasicDetails, postBasicDetails, getUser, getUsers } = require("./fs_crud");
const { insertIntoBasicDetails, insertUserIntoBasicDetails, getUsersFromBasicDetails, getUserFromBasicDetails } = require("./insert_into_db_fr_form");
const { paginationGrid } = require("./pagination");
const { attendenceGrid } = require("./attendence_master");
const { examMasterGrid, getStudentDetails } = require("./exam_master");
const { postSearchByQuery, getGridOfSearchByQuery } = require("./searching_by_query");
const { searchingByMultipleFieldsGrid, postSearchingByMultipleFields } = require("./searching_by_multiple_fields");
const { delimeterSearchGrid, delimeterSearch } = require("./delimeter_search");
const { jobApplication, postJobApplication, jobApplicationUpdationUi, updateJobApplication, fetchJobApplicationData } = require("./job_application");


module.exports = { home, dynamic_table, kuku_cube, tic_tac_toe, static_website_1, static_website_2, static_website_3, getLogin, postLogin, logOut, getRegistration, postRegistration, getBasicDetails, postBasicDetails, getUser, getUsers, insertIntoBasicDetails, insertUserIntoBasicDetails, getUsersFromBasicDetails, getUserFromBasicDetails, paginationGrid, attendenceGrid, examMasterGrid, getStudentDetails, postSearchByQuery, getGridOfSearchByQuery, searchingByMultipleFieldsGrid, postSearchingByMultipleFields, delimeterSearchGrid, delimeterSearch, jobApplication, postJobApplication, jobApplicationUpdationUi, updateJobApplication, fetchJobApplicationData };