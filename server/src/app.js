const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const autoRouter = require('./routes/autoRoutes');
const authRouter = require('./routes/authRouter');
const tokenRouter = require('./routes/tokenRouter');
const editUserRouter = require('./routes/editUserRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/autos', autoRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('api/users', editUserRouter);

module.exports = app;