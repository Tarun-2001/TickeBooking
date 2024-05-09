const express = require('express')
const { bookedSeats, getAvailableSeats } = require('../controllers/booking')
const router = express.Router()


router.post('/ticket',bookedSeats)
router.get('/available-seats',getAvailableSeats)

module.exports = router