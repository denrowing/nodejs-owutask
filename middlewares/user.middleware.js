const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');

module.exports = {
    isUserCreatedBefore: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({ email: req.body.email });
            if(userByEmail) {
                throw new Error('Email already exists');
            }
            console.log('Hello World!');
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserCreated: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({ email: req.body.email });
            if(!userByEmail) {
                throw new Error('Email not exists');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isPasswordCreated: async (req, res, next) => {
        try {
            const userByPassword = await User.findOne({ password: req.body.password });
            if(!userByPassword) {
                throw new Error('Password not exists');
            }
            next();
        } catch (e) {
            res.json(e.message);
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
            res.json(e.message);
        }
    }
};
