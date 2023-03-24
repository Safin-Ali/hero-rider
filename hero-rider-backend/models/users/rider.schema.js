const mongoose = require('mongoose');

const riderUserSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    email: String,
    phone: String,
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
    accessCourses: [String]
});

module.exports = riderUserSchema