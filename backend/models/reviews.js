const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {
        name: String,
        photo: String,
    },
    comments: String,
    cratedDate: String,
    date: String,
    response: String,
    ratings: {
        home: Number,
        cleanliness: Number,
        checkin: Number,
        accuracy: Number,
        location: Number,
        value: Number
    },
    listing: {
        type: mongoose.Types.ObjectId,
        ref: 'Home'
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;