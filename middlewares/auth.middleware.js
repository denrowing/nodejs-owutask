const { passwordService, jwtService } = require('../servise/index');
const { AUTHORIZATION } = require('../configs/const');
const ErrorHandler = require("../errors/ErrorHandler");
const { O_Auth } = require('../dataBase');
const tokenTypeEnum = require('../configs/token-type.enum');
// const roleEnum tokenTypeEnum = require('../configs/user-role.enum');
// const hashedPassword = require('../servise/password.service');

module.exports = {
    isPasswordMatched: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    // registrUser: async (req, res, next) => {
    //     try {
    // const { name, email, password } = req.body;
    //
    // const candidate = await User.findOne({ name });
    // if (candidate) {
    //     return res.status(400).json({message: 'User already exists'});
    // }

    // const userByEmail = await User.findOne({ email: req.body.email });
    // if(userByEmail) {
    //     return next({
    //         message: 'Email already exist',
    //         status: 404
    //     });

    //         const userRole = roleEnum.USER;
    //         const user = new User({name, email, password: hashedPassword.hash(password), role: userRole});
    //         console.log(user);
    //         next();
    //     } catch (e) {
    //
    //     }
    // },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION); // get data from headers

            if(!token) {
                throw new ErrorHandler('Invalid token', 401);
            }

            console.log(token);

            await jwtService.verifyToken(token);

            const tokenResponce = await O_Auth.findOne({
                access_token: token
            }).populate('user_id'); // analog join (put data from
            // other db by some criteria)

            if(!tokenResponce) {
                throw new ErrorHandler('Invalid token', 401);
            }

            req.user = tokenResponce.user_id;

            console.log('+++++++++++++++');
            console.log(tokenResponce);
            console.log('+++++++++++++++');
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION); // get data from headers

            if(!token) {
                throw new ErrorHandler('Invalid token', 401);
            }

            console.log(token);

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponce = await O_Auth.findOne({
                refresh_token: token
            }).populate('user_id'); // analog join (put data from
            // other db by some criteria)

            if(!tokenResponce) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await O_Auth.remove({ refresh_token: token });

            req.user = tokenResponce.user_id;

            console.log('+++++++++++++++');
            console.log(tokenResponce);
            console.log('+++++++++++++++');
            next();
        } catch (e) {
            next(e);
        }
    },
};
