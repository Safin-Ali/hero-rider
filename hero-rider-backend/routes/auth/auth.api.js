const express = require('express');
const route = express.Router();
const Rider = require('../../models/users/users.model');
const bcrypt = require('bcrypt');
const {generateToken,verifyJWT,hashPassword} = require('../../helpers/auth.helper');
const LeassonPackages = require('../../models/./leasson-packages/leasson.packages.model');

route.post('/signup', async (req, res) => {
    try {
        const userRole = req.query.role;

        const hashPassString = await hashPassword(req.body.password);

        const bodyData = {
            ...req.body,
            userRole,
            block: false,
            password: hashPassString,
            accessCourses: []
        };

        const validateEmail = await Rider.findOne({email: bodyData.email}).count();

        if(validateEmail > 0) return res.status(409).send({message: `already have account`});

        await new Rider(bodyData).save();

        return res.send({ acknowledge: true });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: `Internal Server Error`})
    }
});

route.post(`/login`, async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await Rider.findOne({ email: email });
        const encryptPass = userData.password;

        const decryptResult = await bcrypt.compare(password, encryptPass);

        if (!decryptResult) return res.status(400).send({ message: `Wrong Password` })

        const authroizationToken = generateToken({ email, password, _id: userData['_id'] });

        res.send({
            authroizationToken,
            userEmail: userData.email,
            userRole: userData.userRole,
            userBlock: userData.block,
            userAvatar: userData.profilePicture,
            courses: userData.accessCourses,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: `Internal Server Error`})
    }
});

route.get(`/user-persist`, verifyJWT, async (req, res) => {
    try {
        const {email,_id} = req.decryptCode;
        const userData = await Rider.findOne({ email, _id});

        res.send({
            userEmail: userData.email,
            userRole: userData.userRole,
            userBlock: userData.block,
            userAvatar: userData.profilePicture,
            courses: userData.accessCourses,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: `Internal Server Error`});
    }
});

route.patch('/update-user',verifyJWT,async (req,res)=>{
    try{
        const {packagesId,email} = req.body;
        const updateUser = {$push: { accessCourses:packagesId } };
        await Rider.updateOne({email: email},updateUser);
        await LeassonPackages.updateOne({_id: packagesId},{ $inc: { totalBuyPurchase: 1 } }, { new: true });
        res.send({acknowledge: true});

    } catch(error){
        console.log(err.message);
        res.status(500).send({message: `Internal Server Error`})
    }
})

module.exports = route;