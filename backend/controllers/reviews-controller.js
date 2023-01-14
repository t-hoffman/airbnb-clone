const express = require('express');
const router = express.Router();
const { Review } = require('../models')


require('../config/db.connection')

router.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
   
})

router.post('/', async (req, res, next) =>{
    try {
     const createdReview = await Review.create(req.body)
     res.status(201).json(createdReview)
     
    } catch (error) {
     res.status(400).json(error)
         next();
    }
 })

 router.get("/:id", async (req, res, next) => {
	try {
        const review = await Review.findById(req.params.id)
        res.status(200).json(home)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

router.delete("/:id", async (req, res, next) => {
	try {
        const deletedReview = await Home.findByIdAndRemove(req.params.id)
        res.status(202).json({message:`${deletedReview}`})
        
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

router.put("/:id", async (req, res, next) => {
	try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json(updatedReview)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

module.exports = router;
