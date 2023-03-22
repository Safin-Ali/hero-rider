const mongoose = require('mongoose');

const leassonPackagesSchema = new mongoose.Schema({
    leasson: String,
    thumbUrl: String,
    leassonLevel: String,
    guiderName: String,
    guiderAvatar: String,
    totalVideo: Number,
    totalAssignment: Number,
    totalBuyPurchase: Number,
    price: Number
});

module.exports = leassonPackagesSchema