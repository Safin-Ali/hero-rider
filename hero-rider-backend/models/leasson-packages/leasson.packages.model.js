const mongoose = require('mongoose');
const leassonPackagesSchema = require('./leasson.packges.schema');

const LeassonPackages = mongoose.model(`leasson_package`,leassonPackagesSchema);

module.exports = LeassonPackages;