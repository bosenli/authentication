//install dependency: npm i bcrypt cors morgan express

const express = require('express');
const cors = require('cors');  //cors make sure course policy from a trusted source
const logger = require('morgan');

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

module.exports = app