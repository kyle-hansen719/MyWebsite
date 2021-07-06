require('dotenv').config();
const fs = require('fs');

const developmentEnv = fs.existsSync('env.json') ? JSON.parse(fs.readFileSync('env.json')) : {};

const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.accessKeyId = developmentEnv.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = developmentEnv.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
const lambda = new AWS.Lambda();

const sgMail = require('@sendgrid/mail');
const { exception } = require('console');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Serving pages
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/EmailSuccess', (req, res) => {
    res.sendFile(`${__dirname}/views/EmailSuccess.html`);
});

app.get('/resume', (req, res) => {
    res.sendFile(`${__dirname}/public/kyles-resume.pdf`)
});

// Sending emails.
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

    res.status(200).redirect('/EmailSuccess');
});

app.get(`/test`, async (req, res) => {
    let response = await invokeLambdaFunc('test');
    res.send(response);
});

// Lambda Stuff.
const invokeLambdaFunc = async (functionName, payload = {}) => {
    var params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };

    return await lambda.invoke(params).promise();
}

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}`));