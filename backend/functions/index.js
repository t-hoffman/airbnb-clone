const functions = require("firebase-functions");

///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize .env variables
require("dotenv").config();

const cors= require('cors');
const morgan = require('morgan');

// import express
const express = require("express");
require('./config/db.connection')

const { homeControllers } = require ('./controllers')
const { reviewControllers } = require ('./controllers')
const {Home, Review} = require('./models')

// create application object
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/home/', homeControllers );
app.use('/api/review/', reviewControllers)
app.use((err, req, res, next) => res.status(500).send(err))

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/api/", (req, res) => {
    res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
// app.listen(3500, () => console.log(`listening on PORT 3500`));

exports.app = functions.https.onRequest(app);
