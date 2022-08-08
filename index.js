require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoConnect = require('./utilities/database').mongoConnect;

const app = express();

const serverPort = process.env.SERVER_PORT;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoConnect(() => {
  app.listen(serverPort);
});

// eslint-disable-next-line no-console
console.log(`Server is running on port: ${serverPort}`);