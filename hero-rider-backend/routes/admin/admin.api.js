const express = require('express');
const route = express.Router();
const User = require('../../models/users/users.model');
const {verifyJWT} = require('../../helpers/auth.helper');

route.get(`/get-users`,verifyJWT, async (req,res)=>{
    try {
        const users = await User.find({userRole: {$ne: 'admin'}},{password:0});
        console.log(users)
        res.send(users)
    } catch (error) {
        console.log(error);
        res.status(500).send(`Internal Server Error`);
    }
})

module.exports = route;