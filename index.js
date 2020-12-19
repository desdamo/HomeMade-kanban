require('dotenv').config();

const express = require('express');
const multer = require('multer');
const cors = require('cors');

const router = require('./app/router');
const sanitizeData = require('./app/middlewares/sanitizeData');


const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type'
}));

const bodyParser = multer();

app.use(bodyParser.none());

app.use(express.static('./assets'));

app.use(express.urlencoded({extended: true}));

app.use(sanitizeData);

app.use(router);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});