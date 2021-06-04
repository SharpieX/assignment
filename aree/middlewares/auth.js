
const jwt = require("jsonwebtoken");
const config = require('../config.json')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, config.secret, function (err, decode) {
            if (err) {
                req.user = undefined;
                res.status(401).json({message: "Jwt Expired"});
            }
            req.user = decode;
            next();
        });
    } catch (error) {
        res.status(401).json({message: "No token provided"});
    }
};