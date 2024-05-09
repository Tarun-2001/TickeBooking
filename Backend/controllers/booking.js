const asyncWrapper = require("../middleware/asyncWrapper");
const MetaError = require('../errors/MetaError');
const Booking = require("../model/bookingModel");

const screens = [
    {
      name: 'Screen 1',
      totalSeats: 10,
      vacantSeats:[1,2,3,4,5,6,7,8,9,10]
    },
    {
      name: 'Screen 2',
      totalSeats: 80,
      vacantSeats:[1,2,3,4,5,6,7,8,9,10]    
    },
    {
      name: 'Screen 3',
      totalSeats: 120,
      vacantSeats:[1,2,3,4,5,6,7,8,9,10]    
    },
    {
      name: 'Screen 4',
      totalSeats: 90,
      vacantSeats:[1,2,3,4,5,6,7,8,9,10]    
    }
  ];

const bookedSeats = asyncWrapper(async(req,res)=>{

  const { userId, screen, bookedSeats } = req.body;
  const selectedScreen = screens.find((screenObj)=>{screenObj.name.equals(screen)});
  if (!selectedScreen) {
    return res.status(404).json({ message: 'Screen not found' });
  }
  const availableSeats = selectedScreen.vacantSeats;
  const invalidSeats = bookedSeats.filter((seat)=>{!availableSeats.includes(seat)});
  if (invalidSeats.length > 0) 
    return res.status(400).json({ message: 'Some seats are already booked or invalid' });

  const updatedVacantSeats = availableSeats.filter((seat)=>{!bookedSeats.includes(seat)});
  selectedScreen.vacantSeats = updatedVacantSeats;

    const booking = new Booking({
        userId,
        screen: selectedScreen.name,
        bookedSeats: bookedSeats
      });

    const booked = await Booking.create(booking);
    res.status(201).json({ message: 'Seats booked successfully', booked });
})
module.exports = {bookedSeats}