const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isUserCreatedBefore: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({ email: req.body.email });
            if(userByEmail) {
                // throw new Error('Email already exists');
                return next({
                    message: 'Email already exist',
                    status: 404
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    // isUserCreated: async (req, res, next) => {
    //     try {
    //         const userByEmail = await User.findOne({ email: req.body.email });
    //         if(!userByEmail) {
    //             throw new Error('Email not exists');
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    //
    // isPasswordCreated: async (req, res, next) => {
    //     try {
    //         const userByPassword = await User.findOne({ password: req.body.password });
    //         if(!userByPassword) {
    //             throw new Error('Password not exists');
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({ email: req.body.email })
                .select('+password')
                .lean();

            if(!userByEmail) {
                // return next({
                //     message: 'Wrong email or password',
                //     status: 404
                // });
                throw new ErrorHandler('Wrong email or password', 418);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            console.log('+++++++++++++');
            console.log(role);
            console.log('+++++++++++++');

            if(!roleArr.includes(role)) {
                throw new Error('Access denied');
            }

        } catch (e) {
            next(e);
        }
    }
};
