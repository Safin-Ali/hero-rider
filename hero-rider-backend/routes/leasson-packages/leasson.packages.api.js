const express = require('express');
const route = express.Router();
const LeassonPackages = require('../../models/leasson-packages/leasson.packages.model');
const { verifyJWT} = require('../../helpers/auth.helper');

route.get(`/leasson-packages`, verifyJWT, async (req, res) => {
    try {
        const result = await LeassonPackages.find();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: `Internal Server Error` });
    }
})

module.exports = route;