const bcript = require('bcrypt');

module.exports = {
    hash: (password) => bcript.hash(password,10),
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcript.compare(password, hashPassword);
        if(!isPasswordMatched) {
            throw new Error('Wrong email or password');
        }
    }
};
