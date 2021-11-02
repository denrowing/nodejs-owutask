const dbUsers = require('../dataBase/Users')

module.exports = {
  getUsers: (req, res) => {
      res.json(dbUsers);
  },
    createUser: (req, res) => {
        console.log(req.body);

        dbUsers.push({...req.body, id: dbUsers.length + 1})
        res.json(dbUsers);
    },
    getUserById: (req, res) => {
        const { user_id } = req.params
        const user = dbUsers[user_id - 1]
        res.json({ user });
    },
    deleteUser: (req, res) => {
        const user_id = req.params.id;
        dbUsers.splice((user_id - 1), 1)
        // delete dbUsers[dbUsers.indexOf(dbUsers.filter(function(d){ return d.id == req.params.id; }))]

        // console.log(id);
        // const userIndex = dbUsers.findIndex(p => p.id === id);
        // console.log(userIndex);
        //     dbUsers.splice(userIndex, 1); // const deletedUser =
        res.json(dbUsers);
        res.json('User deleted');
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
}
