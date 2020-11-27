require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const pages = require('./pages');
const express = require('express');
const app = express();

const { Client } = require('pg');
const client = new Client({
    //remove this before pushing
    connectionString: process.env.DATABASE_URL || 'postgres://zvjeomarwocyuy:ce46dce9c71f968b8f318f0955b2cbcb8310b755a40e1731c95e91b1549af327@ec2-54-166-114-48.compute-1.amazonaws.com:5432/dc3965rfdnv7k5',
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pages);

app.post('/api', (req, res) => {
    console.log(`Post User ID: ${req.body.user_id}`);
    console.log(`Post Score: ${req.body.pokemon_score}`);
    console.log(`Post Total Pokemon: ${req.body.total_pokemon}`);

    //client.query(`INSERT INTO testpokemon (id, score, totalpokemon) VALUES (${parseInt(req.body.user_id)}, ${parseInt(req.body.pokemon_score)}, ${parseInt(req.body.total_pokemon)});`, (err, res) => {
    //    if (err) console.error(err);
    //    //client.end();
    //});

    //--UPDATE testpokemon SET score=5,totalpokemon=10 WHERE id=1;
    const query = `UPDATE testpokemon SET score=${parseInt(req.body.pokemon_score)},totalpokemon=${parseInt(req.body.total_pokemon)} WHERE id=${parseInt(req.body.user_id)}`;
    client.query(query, (err, res) => {
        if (err) console.error(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}`));