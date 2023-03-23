const mongoose = require('mongoose');
const riderSchema = require('./rider.schema');

const User = mongoose.model(`userList`,riderSchema);

module.exports = User