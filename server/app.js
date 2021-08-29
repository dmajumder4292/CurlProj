import express from 'express';
import admin from './routes/Admin';
import client from './routes/Client';
import bodyParser from 'body-parser';
import cors from "cors";

let app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/admin', admin);
app.use('/client', client);

module.exports = app
