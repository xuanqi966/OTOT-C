const router = require('express').Router()
const auth = require('../middleware/auth')
const userController = require('../controller/userController')

router.route('/')
    .get(userController.index)

router.route('/signup')
    .post(userController.signup)

router.route('/login')
    .post(userController.login)

router.route('/user-info')
    .get(auth, userController.normalAccess)

router.route('/admin-info')
    .get(auth, userController.adminAccess)

router.route('/delete')
    .get(userController.delete)

module.exports = router