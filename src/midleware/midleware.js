const JWT = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET_KEY;

const midleware = (req, res, next) => {
    let token = req.headers.token;

    if(!token) {
        return res.status(401).send({message: 'Token is require'})
    }

    try {
        const decode = JWT.verify(token, secret_key)
        req.user = decode;
        if(decode.role === 'admin' || 'moderator') {
            req.userISAdmin = true;
        }

        next()
    } catch (error) {
        res.status(500).send({message: error.message})
        console.log(error);
    }
}

module.exports = {midleware};