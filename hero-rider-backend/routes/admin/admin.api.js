const express = require('express');
const route = express.Router();
const User = require('../../models/users/users.model');
const {verifyJWT} = require('../../helpers/auth.helper');

route.get(`/get-users`,verifyJWT, async (req,res)=>{
    try {
        const count = req.query.count;
        const totalCount = await User.find({userRole: {$ne: 'admin'}}).countDocuments();
        const users = await User.find({userRole: {$ne: 'admin'}},{password:0}).skip(parseInt(count)).limit(5);
        res.send({users,count:totalCount});
    } catch (error) {
        console.log(error);
        res.status(500).send(`Internal Server Error`);
    }
});

route.patch(`/users-access`,verifyJWT, async (req,res)=>{
    try {
        const {userList,actionType} = req.body;
        const accessBool = actionType === 'block' ? true : false;

        const result = await User.updateMany({_id: {$in: userList}},{block:accessBool});
        
        res.send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(`Internal Server Error`);
    }
});

module.exports = route;