const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// function to hash a password using bcrypt
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// verify JWT
function verifyJWT(req, res, next) {
    const authorization = req.headers.authorization;

    // // when req authorization code not found or null
    if (!authorization) return res.status(401).send({ message: `Go to your Grandmother house` });

    const encryptToken = authorization.split(' ')[1];
    jwt.verify(encryptToken, process.env.JWT_SECRET_TOKEN, (err, decryptCode) => {

        // if when decrypt not successfull
        if (err) return res.status(401).send({ message: `Unauthorization` });
        req.decryptCode = decryptCode;
        return next();
    })
};

// generate JWT token
function generateToken(userData) {
    const expireTime = {
        expiresIn: '1w'
    };
    const secret = process.env.JWT_SECRET_TOKEN;
    return jwt.sign(userData, secret, expireTime);
};

module.exports = {
    generateToken,
    verifyJWT,
    hashPassword
}