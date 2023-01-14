const express = require('express');
const { trusted } = require('mongoose');
const router = express.Router();
const { Home } = require('../models')

require('../config/db.connection')

router.get("/limit/", async (req, res, next) => {
    try {
        const page = req.query.page;
        const limit = req.query.limit;

        if (page && limit) {
            const home = await Home.find({})
            .skip(page > 0 ? (page - 1) * req.query.limit : 0)
            .limit(req.query.limit);
            res.status(200).json(home);
        } else if (limit) {
            const home = await Home.find({})
            .limit(req.query.limit);
            res.status(200).json(home);
        } else {
            res.status(400).json({ message: 'limit required' })
        }
    } catch (error) {
        res.status(400).json(error);
        next();
    }
});

router.get("/location/:query", async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const page = req.query.page;
        const mongoQuery = {$or: [{address: {'$regex': req.params.query, $options: 'i'}},
                                  {name: {'$regex': req.params.query, $options: 'i'}}
                                 ]
                           };

        if (limit && page) {
            const results = await Home.find(mongoQuery)
            .skip(page > 0 ? (page - 1) * req.query.limit : 0)
            .limit(limit);
            res.status(200).json(results);
        } else if (limit) {
            const results = await Home.find(mongoQuery)
            .limit(limit);
            res.status(200).json(results);
        } else {
            const results = await Home.find(mongoQuery);
            res.status(200).json(results);
        }
    } catch (error) {
        res.status(400).json(error);
        next();
    }
});

router.get("/user/:id", async (req, res, next) => {
    try {
        const userID = req.params.id;
        const home = await Home.find({userId: userID})
        res.status(200).json(home);
    } catch (error) {
        res.status(400).json(error);
        next();
    }
});

router.get('/', async (req, res, next) => {
    try {
        const homes = await Home.find({})
        res.status(200).json(homes)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
   
})

router.post('/', async (req, res, next) =>{
    try {
     const createdHome = await Home.create(req.body)
     res.status(201).json(createdHome)
     
    } catch (error) {
     res.status(400).json(error)
         next();
    }
 })

 router.get("/:id", async (req, res, next) => {
	try {
        const home = await Home.findById(req.params.id)
        const homeWithReviews = await home.populate('reviews');
        res.status(200).json(homeWithReviews)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

router.delete("/:id", async (req, res, next) => {
	try {
        const deletedHome = await Home.findByIdAndRemove(req.params.id)
        res.status(202).json({message:`${deletedHome}`})
        
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

router.put("/:id", async (req, res, next) => {
	try {
        const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json(updatedHome)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

module.exports = router;
