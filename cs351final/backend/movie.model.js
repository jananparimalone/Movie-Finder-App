const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Movie = new Schema({
        adult: Boolean,
        backdrop_path: String,
       budget: Number,
       homepage: String,
        _id: Number,
        imdb_id: String,
        original_language: String,
        original_title: String,
        overview: String,
        popularity: Number,
        poster_path: String,
       release_date: String,
        revenue: Number,
        runtime: Number,
        status: String,
        tagline: String,
        title: String,
        video: Boolean,
        vote_average: Number,
        vote_count: Number
    }
);

module.exports = mongoose.model('Movie', Movie);