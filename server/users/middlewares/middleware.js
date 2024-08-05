const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log('verifying JWT');
    const token = req.headers['x-access-token'];

    if (!token) {
        res.json({isAuth: false, message: 'Potrzebny token do uwierzytelneinia użytkownika'})
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({isAuth: false, message: 'Błąd podczas uwierzytelniania'});
            } else {
                req.userId = decoded.id;
                res.locals.id = decoded.id;
                next();
            }
        })
    }
}

module.exports = {
    verifyJWT
}