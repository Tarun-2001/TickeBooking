const express = require('express')
const { login, register, updateUser } = require('../controllers/auth')

const router = express.Router()

router.post('/login',login)
router.post('/register',register)

module.exports = router