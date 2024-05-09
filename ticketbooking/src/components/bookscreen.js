import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingScreen = () => {
  const navigate = useNavigate();
  const [selectedScreen, setSelectedScreen] = useState('Screen 1');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);

  const handleScreenChange = (e) => {
    setSelectedScreen(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/book");
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/book/available-seats`,{
          method: 'GET',
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
        });
        const data = await response.json();
        setAvailableSeats(data);
      } catch (error) {
        console.error('Error fetching available seats:', error);
      }
    };
    fetchAvailableSeats();
  }, [bookingStatus]);

  const handleLogOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };

  const handleSeatChange = (e) => {
    setSelectedSeat(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let array = selectedSeat.split(',').map(seat => parseInt(seat, 10))
    let statusCode = null
    if (selectedSeat !== '') {
      const response = await fetch(`http://localhost:5000/api/book/ticket`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          screen: selectedScreen,
          bookedSeats: array,
        }),
      });
      const res = await response.json();
      if (res.booked!=null){
        setBookingStatus('success');
        alert('Tickets booked successfully!');
      }
      else  {
        setBookingStatus('failure');
        alert('Booking unsuccessfully please select vacant seats');
      }
    } else {
      alert('Please enter a number from 1 to 10.');
    }
  };

  return (
    <div>
      <h2>Booking Screen</h2>
      <div>
        <label htmlFor="screenSelect">Select Screen:</label>
        <select id="screenSelect" value={selectedScreen} onChange={handleScreenChange}>
          <option value="Screen 1">Screen 1</option>
          <option value="Screen 2">Screen 2</option>
          <option value="Screen 3">Screen 3</option>
          <option value="Screen 4">Screen 4</option>
        </select>
      </div>
      <div>
        <label htmlFor="seatInput">Enter Seat Number (1-10):</label>
        <input
          type="text"
          id="seatInput"
          value={selectedSeat}
          onChange={handleSeatChange}
          required
        />
      </div>
      <button type="submit" onClick={handleSubmit}>Book Seat</button>

      <div>
        <h3>Available Seats</h3>
        {availableSeats.map(screen => (
          <div key={screen.name}>
            <h4>{screen.name}</h4>
            <ul>
              {screen.availableSeats.map(seat => (
                <li key={seat}>{seat}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default BookingScreen;
