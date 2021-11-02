const router = require('express').Router();

const { userController } = require('../controllers/index')

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/:user_id', userController.getUserById);

router.delete('/:user_id', userController.deleteUser);

router.post('/:user_id/login', userController.loginUser);

router.post('/:user_id/appartment', userController.createAppartment);

router.post('/:user_id/post/:post_id', userController.createPost);

router.delete('/:user_id/post/:post_id', userController.deletePost);

module.exports = router;
