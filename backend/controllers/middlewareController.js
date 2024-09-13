const jwt = require("jsonwebtoken");

const middlewareController = {
    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You're not authenticated");
        }

    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            }
            else {
                res.status(403).json("You'are not allowed to delete other")
            }
        })
    }
    // verify: (req, res, next) => {
    //     bcrypt.compare(req.query.email, req.query.token, (err, result) => {
    //         if (result == true) {
    //             user.verify(req.query.email, (err, result) => {
    //                 if (!err) {
    //                     next();
    //                 }
    //                 else {
    //                     res.status(500);
    //                 }
    //             })
    //         }
    //         else {
    //             res.status(404);
    //         }
    //     })
    // }
}
module.exports = middlewareController;