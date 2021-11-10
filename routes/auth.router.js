const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const {authMiddleware, userMiddleware } = require('../middlewares');
// const {USER, MANAGER, ADMIN} = require("../configs/user-role.enum");


router.post('/', userMiddleware.isUserPresent, //userMiddleware.checkUserRole([
    //     USER,
    //     MANAGER,
    //     ADMIN
    // ]),
    authMiddleware.isPasswordMatched, authController.login);

// router.post('/registration', authController.registrate);

router.post('/logout', authController.logout);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);


module.exports = router;
