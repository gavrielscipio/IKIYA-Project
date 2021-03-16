const router = require('express').Router()
const { userController } = require('../controllers')
const { body } = require('express-validator')
const { verifyToken } = require('../helpers/jwt')

const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Username must have a minimum of 6 characters'),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Password must have a minimum of 6 characters')
        .matches(/[0-9]/)
        .withMessage('Password must include a number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must include a symbol'),
    body('email')
        .isEmail()
        .withMessage('Email is invalid')
]

const editValidator= [
    body('username')
        .optional()
        .matches(/\w{4,}/)
        .withMessage('username can not contain spaces or symbol min 4 characters'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('invalid email'),
    body('password')
        .optional()
        .match(/.{6,}/)
        .withMessage('password length must be at least 6 characters')
        .match(/[a-z]/)
        .withMessage('password must contain lowercase')
        .match(/[A-Z]/)
        .withMessage('password must contain uppercase')
        .match(/\S/)
        .withMessage('password can not contain spaces')
]

router.post('/register', registerValidation, userController.register)
router.post('/keepLogin', verifyToken, userController.keepLogin)
router.post('/showAll', userController.showAll)
router.post('/login', userController.login)
router.post('/forgot', userController.forgotPassword)
router.patch('/reset',editValidator, verifyToken, userController.resetPassword)

module.exports = router