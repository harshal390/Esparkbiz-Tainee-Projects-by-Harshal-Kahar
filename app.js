const express = require('express');
const app = express();
const port = 3000;
const route = require("./routes");
const JobApplication = require("./databases");

//for 3rd party middleware (take input from ejs/html form)
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');


app.use(express.static('public'));


app.use(route);

app.listen(port, async () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
    try {
        await JobApplication.createDB();
        JobApplication.createBasicDetails();
        JobApplication.createWorkExp();
        JobApplication.creteEducations();
        JobApplication.createLanguages();
        JobApplication.crateTechDetails();
        JobApplication.createReferenceContact();
        JobApplication.createPreferences();
    } catch (error) {
        console.log(error);
    }
});

process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1);
    })
})