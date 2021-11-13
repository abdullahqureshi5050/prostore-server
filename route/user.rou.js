const express = require('express')
const router = express.Router();
const  userController = require("../controller/user.con");
const {TOKEN, authentication, deleteToken} = require('../jwt')

router.get('/dashboard', authentication, userController.getDashbard)
router.post('/dashboard', authentication, userController.postDashboardAPI)
router.get('/', userController.getHome)

router.get('/login', userController.getLogin)
router.post('/login', userController.getLogin)

router.get('/register', userController.getRegister)
router.post('/logout', userController.postLogout)
router.get('/logout', userController.postLogout)

module.exports = router
