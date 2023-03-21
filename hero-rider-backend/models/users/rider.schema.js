const mongoose = require('mongoose');

const riderUserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    address: String,
    area: String,
    carModel: String,
    carName: String,
    carPlate: String,
    drivingLicencePicture: String,
    nidPicture: String,
    password: String,
    confirmPassword: String,
    profilePicture: String,
    vehicleType: String,
    userRole: String,
    block: Boolean,
})

module.exports = riderUserSchema