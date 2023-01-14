///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize .env variables
require("dotenv").config();

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;
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

app.use('/home', homeControllers );
app.use('/review', reviewControllers)
app.use((err, req, res, next) => res.status(500).send(err))

app.use('/test', async (req,res) => {
    try {
        const findHome = await Home.find({});
        const ids = [];
        findHome.map(h => {
            ids.push(h._id);
        })
        
    }catch(err) {
        console.log(err);
    }
});

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));