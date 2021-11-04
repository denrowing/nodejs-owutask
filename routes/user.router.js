const router = require('express').Router();

const { userController } = require('../controllers/index');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);

router.post('/', userMiddleware.isUserBodyValid, userMiddleware.isUserCreatedBefore, userController.createUser);

router.get('/:user_id', userController.getUserById);

router.delete('/:user_id', userController.deleteUser);

router.get('/auth', userController.loginUser); //userMiddleware.isUserCreated, userMiddleware.isPasswordCreated

router.post('/:user_id/appartment', userController.createAppartment);

router.post('/:user_id/post/:post_id', userController.createPost);

router.delete('/:user_id/post/:post_id', userController.deletePost);

module.exports = router;
