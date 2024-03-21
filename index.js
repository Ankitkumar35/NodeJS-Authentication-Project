import express from 'express';
const bodyParser = require('body-parser');
const app = new express();


app.use(bodyParser.json());