import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);
