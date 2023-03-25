const mongoose = require('mongoose');

const riderUserSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    email: String,
    phone: String,
    address: String,
    area: String,
    vehicleModel: String,
    vehicleName: String,
    vehiclePlate: String,
    drivingLicencePicture: String,
    nidPicture: String,
    password: String,
    profilePicture: String,
    vehicleType: String,
    userRole: String,
    block: Boolean,
    accessCourses: [String]
});

module.exports = riderUserSchema