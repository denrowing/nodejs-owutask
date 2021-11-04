const dbUsers = require('../dataBase/User');
const passwordService = require('../servise/password.service');
const userUtil = require('../util/user.util');


module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await dbUsers.find();

            res.json(users);
        } catch(e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        try{
            const { user_id } = req.params;
            let user = await dbUsers.findById(user_id).lean();

            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch(e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            console.log('********************');
            console.log(hashedPassword);
            console.log('********************');

            const newUser = await dbUsers.create({...req.body, password: hashedPassword});
            res.json(newUser);
        } catch(e) {
            res.json(e);
        }
    },

    deleteUser:  async (req, res) => {
        try{
            const { user_id } = req.params;
            const deletedUser = await dbUsers.findOneAndDelete(user_id).lean();
            res.json({ deletedUser });
        } catch (e) {
            res.json(e);
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

    deletePost: (req, res) => {
        res.json('Users post is delete');
    }
};
