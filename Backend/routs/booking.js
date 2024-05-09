const express = require('express')
const { bookedSeats } = require('../controllers/booking')
const router = express.Router()


router.post('/ticket',bookedSeats)

module.exports = router