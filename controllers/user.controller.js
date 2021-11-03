const dbUsers = require('../dataBase/Users');
const fs = require('fs');

module.exports = {
    getUsers: (req, res) => {
        fs.readFile('/home/denys/WebstormProjects/owu/nodejs-task/dataBase/users.json', 'utf8',
            (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(data.toString());
            });
        res.json(dbUsers);
    },
    createUser: (req, res) => {
        console.log(req.body);

        dbUsers.push({...req.body, id: dbUsers.length + 1});
        res.json(dbUsers);
    },

    getUserById: (req, res) => {
        const { user_id } = req.params;
        const user = dbUsers[user_id];
        res.json({ user });
    },

    deleteUser: (req, res) => {
        // fs.readFile('/home/denys/WebstormProjects/owu/nodejs-task/controllers/dataBase/users.json', 'utf8',
        //     function(err, data) {
        //         data = JSON.parse(data);
        //         delete data[data.indexOf(data.filter(function(d) { return d.id === req.params.id; }))];
        //         console.log(data);
        //         fs.writeFile('/home/denys/WebstormProjects/owu/nodejs-task/controllers/dataBase/users.json',
        //         JSON.stringify(data),
        //             function(err) {
        //                 if(err){return console.log(err);}
        //             });
        //     });

        const { user_id } = req.params;
        // dbUsers = dbUsers.filter(user => user.id !== user_id)
        res.send(`User with the id ${user_id} deleted`);
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
