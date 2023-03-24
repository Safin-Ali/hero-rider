const express = require('express');
const route = express.Router();
const User = require('../../models/users/users.model');
const {verifyJWT} = require('../../helpers/auth.helper');

route.get(`/get-users`,verifyJWT, async (req,res) => {
    try {
        const {count,search} = req.query;
        const ageFrom = parseInt(req.query.ageFrom);
        const ageTo = parseInt(req.query.ageTo);
        const searchRegx =  new RegExp(search);
        const query = {
            userRole: {$ne: 'admin'},
            $or: [
                { fullName: { $regex: searchRegx, $options: 'i' } },
                { email: { $regex: searchRegx, $options: 'i' } },
                { phone: { $regex: searchRegx, $options: 'i' } },
              ],
            age: !ageTo ? {$exists: true} : {$gte: ageFrom, $lte: ageTo}
        };
        const totalCount = await User.find(query).countDocuments();

        const users = await User.find(query,{password:0}).skip(parseInt(count)).limit(10).sort({age: 1})

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