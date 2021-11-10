const {Schema, model} = require('mongoose');
const userRoles = require("../configs/user-role.enum");

const userSchema = new Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    square: {
        type: Number,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },

    role: {
        type: String,
        default: userRoles.USER,
    },

    status: {
        type: Boolean,
        required: true,
        default: true,
    },

    bookingAt: {
        type: Boolean,
        required: false,
        default: new Date()
    },
    bookingTo: {
        type: Boolean,
        required: false,
        default: new Date()
    },

}, { timestamps: true });

module.exports = model('apartments', userSchema);
