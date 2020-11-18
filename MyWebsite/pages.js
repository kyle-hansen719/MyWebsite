const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

router.get('/test', (req, res) => {
    res.sendFile(`${__dirname}/views/index-test.html`);
});

module.exports = router;