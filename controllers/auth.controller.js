const { userNormalizator } = require('../util/user.util');
const { O_Auth} = require("../dataBase/index");
// const roleEnum = require("../configs/user-role.enum");
// const hashedPassword = require("../servise/password.service");
const { jwtService } = require('../servise');

module.exports = {
    // registrate: async (req, res, next) => {
    //     try {
    //         const { name, email, password } = req.body;
    //
    //         const candidate = await User.findOne({ name });
    //         if (candidate) {
    //             return res.status(400).json({message: 'User already exists'});
    //         }
    //         const userRole = roleEnum.USER;
    //         const user = new User({name, email, password: hashedPassword.hash(password), role: userRole});
    //         // await user.save();
    //         console.log(user);
    //         return res.json({message:'User is registrated successfully'});
    //         next();
    //     } catch (e) {
    //         console.log(e);
    //         res.status(400).json({message: 'Registration error'});
    //     }
    // },

    login: async (req, res, next) => {
        try {
            const { user } = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch(e) {
            next(e);
        }
    },
    logout: (req, res, next) => {
        try {

            res.json(users);
        } catch(e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { user } = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch(e) {
            next(e);
        }
    },
};
