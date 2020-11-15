const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

router.get('/test', (req, res) => {
    res.send('<h1>loaded</h1>');
});

module.exports = router;