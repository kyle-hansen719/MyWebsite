//TO DO:
//make guard clauses when userID = -1 (front end)
//make google sign in
//add clear account button

require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const pages = require('./pages');
const express = require('express');
const app = express();

const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect(err => {
    if (err) console.error(err);
    console.log('Connected to Database');
});

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pages);

//handles posting of score and total pokemon
app.post('/api', (req, res) => {
    console.log(`Post User ID: ${req.body.user_id}`);
    console.log(`Post Score: ${req.body.pokemon_score}`);
    console.log(`Post Total Pokemon: ${req.body.total_pokemon}`);

    const query = `UPDATE testpokemon SET score=${parseInt(req.body.pokemon_score)},totalpokemon=${parseInt(req.body.total_pokemon)} WHERE id=${parseInt(req.body.user_id)}`;
    client.query(query, (err, res) => {
        if (err) console.error(err);
    });
});

//handles get request for score and total pokemon
app.get('/api/id/:id', (req, res) => {
    const query = `SELECT * FROM testpokemon WHERE id=${req.params.id};`;
    client.query(query, (err, queryRes) => {
        if (err) console.error(err);
        res.send(JSON.stringify(queryRes.rows[0]));
    });
});

const port = process.env.DEVPORT || process.env.PORT;
app.listen(port, console.log(`listening on port ${port}`));