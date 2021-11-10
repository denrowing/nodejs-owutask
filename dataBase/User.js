const {Schema, model} = require('mongoose');
const userRoles = require("../configs/user-role.enum");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        default: userRoles.GUEST,
        enum: Object.values(userRoles)
    },

    apartment: {
        type: Array,
        required: false,
        ref: 'apartments'
    }

}, { timestamps: true });

module.exports = model('user', userSchema);
// module.exports = [
//     {id: 1, name: 'Vlad', age: 17},
//     {id: 2, name: 'Arsen', age: 35},
//     {id: 3, name: 'Vova', age: 12},
//     {id: 4, name: 'Natasha', age: 26},
//     {id: 5, name: 'Kiril', age: 39},
// ]
