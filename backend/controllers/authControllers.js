const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");


let refreshTokens = [];

const authController = {


    //REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                address: req.body.address,
                password: hashed,
            });

            //Save to DB
            const user = await newUser.save();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
            console.log("err", err);
        }
    },

    //RESET TOKEN
    resetToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_RESET_KEY,

        );
    },
    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30s" }
        );
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "365d"
            });
    },

    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Wrong username!");

            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res.status(404).json("Wrong password!")
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //Create new accessToken, refresh token
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            res.status(200).json({ accessToken: newAccessToken });
        })
    },
    //LOG OUT
    userLogout: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out !");
    },
    sendResetPasswordMail: async (username, email, id) => {

        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,

                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD,
                }
            });
            const mailOptions = {
                from: process.env.SMTP_USERNAME,
                to: email,
                subject: 'For reset password',
                html: '<p> Hii ' + username + ' Plese copy the link <a href="http://localhost:3000/reset-password/' + id + '">  Reset your password </a>'
            }
            console.log("mailoptions", mailOptions);
            return transporter.sendMail(mailOptions, function (info, error) {
                if (info) {
                    console.log("Mail has been sent:- ", info.response);
                }
                else {
                    console.log(error);
                }
            })
        } catch (error) {
            res.status(400).send({ succes: false, msg: error.message })
        }
    },
    forgot_password: async (req, res) => {
        try {
            const email = req.body.email;
            const dataUser = await User.findOne({ email: email });

            if (dataUser) {
                const randomString = randomstring.generate();
                const data = await User.updateOne({ email: email })
                authController.sendResetPasswordMail(dataUser.username, dataUser.email, dataUser._id);
                res.status(200).send({ success: true, msg: "Plese check email and reset password", data: data })

            }
            else {
                res.status(205).send({ success: false, msg: "This email dose not exists." })

            }
        } catch (error) {
            res.status(400).send({ success: false, msg: error.message })
        }
    },
    reset_password: async (req, res) => {
        try {
            const id = req.params.id;
            const salt2 = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(req.body.password, salt2);

            const idData = await User.findOne({ _id: id });
            console.log("data:", idData);
            if (idData) {
                const userData = await User.findByIdAndUpdate({ _id: idData.id }, { $set: { password: hashedNewPassword } }, { new: true })
                res.status(200).send({ success: true, msg: "User Password has been reset", data: userData })
            }
            else {
                res.status(200).send({ success: false, msg: "This link has been exprired." })
            }

        } catch (error) {
            res.status(400).send({ success: false, msg: error.message });
            console.log(error);
        }
    }
};

module.exports = authController;




//STORE TOKEN
//1) LOCAL STORAGE
//XSS
//2) HTTPONLY COOKIES:
//CSRF -> SAMESITE
//3) HTTPONLY COOKIES -> REFRESHTOKEN

//BFF PATTERN (BACKEND FOR FRONTEND)






















 // getResetPasswordToken: (user) => {
    //     // const resetToken = await crypto.randomBytes(20).toString('hex');
    //     const resetToken = crypto.randomBytes(20).toString('hex');
    //     console.log("resetToken", resetToken);
    //     //hash token and set to resetpasswordToken feild
    //     this.resetPasswordToken = crypto
    //         .createHash('sha256')
    //         .update(resetToken)
    //         .digest('hex');
    //     //set expire
    //     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    //     return resetToken;
    // },
    // forgotPassword: async (req, res, next) => {
    //     const user = await User.findOne({ email: req.body.email });

    //     if (!user) {
    //         return next(new ErrorResponse(`There is no user with that email`, 404))
    //     }

    //     const resetToken = authController.getResetPasswordToken()

    //     await user.save({ validateBeforeSave: false })

    //     //create reset url
    //     const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`

    //     const message = `You are receiving this email because you (or someone else) has requested the reset of a password`

    //     try {
    //         await sendEmail({
    //             email: user.email,
    //             subject: 'Password reset token',
    //             message
    //         })
    //         res.status(200).json({ success: true, data: 'email sent' });

    //     } catch (error) {
    //         console.log(error);
    //         user.getResetPasswordToken = undefined;
    //         user.resetPasswordExpire = undefined;

    //         await user.save({ validateBeforeSave: false })

    //         return next(new ErrorResponse('Email could not be sent', 500))
    //     }
    // },
    // resetPassword: async (req, res, next) => {
    //     const resetPasswordToken = crypto
    //         .createHash('sha256')
    //         .update(req.params.resetToken)
    //         .digest('hex');

    //     const user = await User.findOne({
    //         resetPasswordToken,
    //         resetPasswordExpire: { $gt: Date.now() }
    //     })
    //     if (!user) {
    //         return next(new ErrorResponse(`Invalid token`, 400));

    //     }

    //     user.password = req.body.password;
    //     user.resetPasswordToken = undefined;
    //     user.resetPasswordExpire = undefined;
    //     await user.save();

    //     const id = user.getId();
    //     sendTokenResponse(user, 200, res, id)
    // }