//TO DO:

require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.post('/api', (req, res) => {
    console.log('bruh');
});

const port = process.env.port || 3000;
app.listen(port, console.log(`listening on port ${port}`));