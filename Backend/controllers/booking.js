const asyncWrapper = require("../middleware/asyncWrapper");
const MetaError = require('../errors/MetaError');
const Booking = require("../model/bookingModel");
const { screens } = require("./screens");

const bookedSeats = asyncWrapper(async (req, res) => {
    const userId = req.user
    const {screen, bookedSeats } = req.body;
    const selectedScreen = screens.find(screenObj => screenObj.name === screen);
    if (!selectedScreen) throw new MetaError.BadRequest('Screen not found');

    const availableSeats = selectedScreen.vacantSeats;
    const invalidSeats = bookedSeats.filter(seat => availableSeats[seat-1]!==false);
    if (invalidSeats.length>0) throw new MetaError.BadRequest('Some seats are already booked or invalid');

    bookedSeats.forEach(seat => {
        availableSeats[seat-1] = true;
    });

    const booking = new Booking({
        userId,
        screen: selectedScreen.name,
        bookedSeats: bookedSeats
    });

    const booked = await Booking.create(booking);
    res.status(201).json({ message: 'Seats booked successfully', booked });
});

const getAvailableSeats = asyncWrapper(async (req, res) => {
      const result = screens.map(screen => ({
          name: screen.name,
          availableSeats: screen.vacantSeats.reduce((seats, seat,i) => {
              if (!seat)  seats.push(i+1);
              return seats;
          }, [])
      }));
      res.status(200).json(result);
});

module.exports = { bookedSeats ,getAvailableSeats};
