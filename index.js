const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/dbconnection');
const app = express();

app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/test', require('./routes/api/test'));

app.get('*', (req, res) => {
    res.status(200).json({message: 'notfound'});
});

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error in running server");
        return;
    }
    console.log(`Server is up and running on http://localhost:${process.env.PORT}`);
});
