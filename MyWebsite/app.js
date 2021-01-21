require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

//sending emails
app.post('/', (req, res) => {
    const msg = {
        to: 'khan7192020@gmail.com',
        from: 'khan7192020@gmail.com',
        subject: `Email From My Website`,
        text: `Sent by '${req.body.name}' from the email address '${req.body.emailAddress}': ${req.body.message}`,
        html: `Sent by '${req.body.name}' from the email address '${req.body.emailAddress}': ${req.body.message}`,
    }
    sgMail.send(msg).then(() => {
        console.log('Email sent')
    }).catch((error) => {
        console.error(error)
    })

    res.status(200).redirect('/');
});


const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${PORT}`));