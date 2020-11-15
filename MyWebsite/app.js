'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

const pages = require('./pages');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pages);

//const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, console.log(`listening on port ${port}`));