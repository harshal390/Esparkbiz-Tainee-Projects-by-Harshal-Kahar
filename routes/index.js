const express = require('express');
const route = express.Router();
const { auth } = require("../middleware/auth");
const { home, dynamic_table, kuku_cube, tic_tac_toe, static_website_1, static_website_2, static_website_3, getLogin, postLogin, logOut, getRegistration, postRegistration, getBasicDetails, postBasicDetails, getUser, getUsers, insertIntoBasicDetails, insertUserIntoBasicDetails, getUsersFromBasicDetails, getUserFromBasicDetails, paginationGrid, attendenceGrid, examMasterGrid, getStudentDetails, postSearchByQuery, getGridOfSearchByQuery, searchingByMultipleFieldsGrid, postSearchingByMultipleFields, delimeterSearchGrid, delimeterSearch, jobApplication, postJobApplication, jobApplicationUpdationUi, updateJobApplication, fetchJobApplicationData, renderSPA, renderSPApostData } = require("../controllers")

route.get('/', auth, home);
route.get('/dynamic_table', auth, dynamic_table);
route.get('/kuku_cube', auth, kuku_cube);
route.get('/tic_tac_toe', auth, tic_tac_toe);
route.get('/static_websites/1', auth, static_website_1);
route.get('/static_websites/2', auth, static_website_2);
route.get('/static_websites/3', auth, static_website_3);

//crud in file system 
route.get('/fs_crud/basicdetails', auth, getBasicDetails);
route.post('/fs_crud/basicdetails', auth, postBasicDetails);
route.get('/fs_crud/user/:user_id', getUser);
route.get('/fs_crud/users', auth, getUsers);

//insert data in the basic_details table
route.get('/insert_to_db_fr_form/basicdetails', auth, insertIntoBasicDetails);
route.post('/insert_to_db_fr_form/basicdetails', auth, insertUserIntoBasicDetails);
route.get('/insert_to_db_fr_form/users', auth, getUsersFromBasicDetails);
route.get('/insert_to_db_fr_form/user/:user_id', auth, getUserFromBasicDetails);

//pagination
route.get('/pagination', auth, paginationGrid)

//Attendence Master
route.get('/attendence_master', auth, attendenceGrid)

//Exam Master
route.get('/exam_master', auth, examMasterGrid)
route.get('/exam_master/student/:student_id', auth, getStudentDetails);

//Searching by Query in Grid
route.post('/searching_by_query', auth, postSearchByQuery);
route.get('/searching_by_query', auth, getGridOfSearchByQuery);

//Searching by multiple fields
route.get('/searching_by_multiple_field', auth, searchingByMultipleFieldsGrid);
route.post('/searching_by_multiple_field', auth, postSearchingByMultipleFields);

//Delimeter Searching
route.get('/delimeter_search', auth, delimeterSearchGrid);
route.post('/delimeter_search', auth, delimeterSearch);

//Single Page Application
route.get('/spa', auth, renderSPA)
route.get('/spa/posts/:post_id', auth, renderSPApostData)
//Job Application CRUD
route.get("/job_application", auth, jobApplication);
route.post("/job_application/send", auth, postJobApplication);
route.get("/job_application/update/:id", auth, jobApplicationUpdationUi);
route.put("/job_application/update/:id", auth, updateJobApplication);
route.get("/fetch/:id", auth, fetchJobApplicationData)

//Authentication
route.get('/login', getLogin);
route.post('/login', postLogin);
route.get('/logout', auth, logOut);
route.get('/register', getRegistration);
route.post('/registraton', postRegistration);

module.exports = route;