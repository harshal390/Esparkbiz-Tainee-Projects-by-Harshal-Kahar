const express = require('express');
const app = express();
const port = 3000;
const { home, dynamic_table, kuku_cube, tic_tac_toe, static_websites } = require("./routes/index")



app.set('view engine', 'ejs');


app.use(express.static('public'));


app.use(home, dynamic_table, kuku_cube, tic_tac_toe, static_websites);

app.listen(port, () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
})