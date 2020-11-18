require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon')
const express = require('express');
const app = express();

const pages = require('./pages');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pages);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}`));