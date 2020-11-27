require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const pages = require('./pages');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pages);

app.post('/api', (req, res) => {
    console.log(`Post Data: ${JSON.stringify(req.body)}`);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}`));