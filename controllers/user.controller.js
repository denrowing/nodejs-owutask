const dbUsers = require('../dataBase/User');
const passwordService = require('../servise/password.service');
const userUtil = require('../util/user.util');


module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await dbUsers.find().select('-password');

            res.json(users);
        } catch(e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try{
            const { user_id } = req.params;
            let user = await dbUsers.findById(user_id).lean();

            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch(e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            console.log('********************');
            console.log(hashedPassword);
            console.log('********************');

            const newUser = await dbUsers.create({...req.body, password: hashedPassword });

            // newUser = userUtil.userNormalizator(newUser);
            res.json({...newUser, password: { type: String, select: false }});

        } catch(e) {
            next(e);
        }
    },

    deleteUser:  async (req, res, next) => {
        try{
            const { user_id } = req.params;
            // res.json(user_id);
            if(!user_id) {
                req.status(400).json({message: 'Id не указан'});
            }
            const deletedUser = await dbUsers.findByIdAndDelete(user_id);
            res.json(deletedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try{
            const { user_id } = req.params;
            const updatedUser = {};
            updatedUser.name = req.body.name;
            await dbUsers.findByIdAndUpdate(user_id, updatedUser, function(err, updatedData){
                if(err){
                    console.log(err);
                }
                else {
                    console.log('***********************');
                    console.log(updatedData);
                    console.log('***********************');
                    //res.redirect or res.send whatever you want to do
                }
            });
        } catch (e) {
            next(e);
        }
    },

    loginUser: (req, res) => {
        res.json('User is login');
    },

    createAppartment: (req, res) => {
        res.json('Appartment is create');
    },

    createPost: (req, res) => {
        res.json('User create post');
    },

    deletePost: (req, res, next) => {
        try {
            console.log('dddddddddddddddddddddddddddd');
            console.log(req.user);
            console.log('dddddddddddddddddddddddddddd');
            res.json('Users post is delete');
        } catch (e) {
            next(e);
        }
    }
};
