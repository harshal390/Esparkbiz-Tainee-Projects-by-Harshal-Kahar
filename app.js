const express = require('express');
const app = express();
const port = 3000;
const route = require("./routes");

//for 3rd party middleware (take input from ejs/html form)
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');


app.use(express.static('public'));


app.use(route);

app.listen(port, () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
})