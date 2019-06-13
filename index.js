const express = require("express");
// const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// require('./config/passport')(passport);

const app = express();

const cors = require('cors');
require('dotenv').config();
require('./config/dbconnection');

app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

const logger = require('morgan');

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
