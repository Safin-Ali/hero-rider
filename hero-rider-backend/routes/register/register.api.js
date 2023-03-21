const express = require('express');
const route = express.Router();
const Rider = require('../../models/users/users.model');

route.post('/signup', async (req, res) => {
    try {
        const userRole = req.query.role;

        const bodyData = {
            ...req.body,
            userRole,
            blocked: false
        };

        await new Rider(bodyData).save();

        return res.send({acknowledge: true});

    } catch (err) {
        console.log(err.message)
    }
})

module.exports = route;