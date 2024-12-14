const express = require('express');
const body_parser=require('body-parser');
const userRoutes=require('./routes/user_routes');

const app = express();
const port = 3000;

app.use(body_parser.json());
app.use('/',userRoutes);
module.exports = app;
