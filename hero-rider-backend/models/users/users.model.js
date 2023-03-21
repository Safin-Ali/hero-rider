const mongoose = require('mongoose');
const riderSchema = require('./rider.schema');

const Rider = mongoose.model(`userList`,riderSchema);

module.exports = Rider