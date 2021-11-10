const bcript = require('bcrypt');
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    hash: (password) => bcript.hash(password,7),
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcript.compare(password, hashPassword);
        if(!isPasswordMatched) {
            throw new ErrorHandler('Wrong email or password', 404);
        }
    }
};
