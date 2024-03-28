const express = require('express');
const app = express();
const port = 3000;
const { home, dynamic_table, kuku_cube, tic_tac_toe, static_websites, pagination } = require("./routes/index")
const { basic_details_route_crud_fs, users_route_crud_fs, user_route_crud_fs } = require("./routes/crud_with_fsmodules/index");
const { insert_to_db_fr_form_basic_details_route, insert_to_db_fr_form_users_route, insert_to_db_fr_form_user_route } = require("./routes/insert_to_db_fr_form/index");

//for 3rd party middleware (take input from ejs/html form)
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


app.use(express.static('public'));


app.use(home, dynamic_table, kuku_cube, tic_tac_toe, static_websites, basic_details_route_crud_fs, users_route_crud_fs, user_route_crud_fs, insert_to_db_fr_form_basic_details_route, insert_to_db_fr_form_users_route, insert_to_db_fr_form_user_route, pagination);

app.listen(port, () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
})