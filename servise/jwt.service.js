const jwt = require('jsonwebtoken');

const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = require('../configs/configs');
const tokenTypeEnum = require('../configs/token-type.enum');
const ErrorHandler = require('../errors/ErrorHandler');


module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_TOKEN, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_REFRESH_TOKEN, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },
    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try{
            const secret = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_TOKEN : JWT_REFRESH_TOKEN;
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    }
};
