import React from "react";
import "./App.css";
import BookingData from "./assets/current-bookings";
import CheckAvailability from "./components/check/check";
import GetBookingsForWeek from "./components/getbookings/getbookings";


function App() {
  return (
    <div className="App">
      <CheckAvailability BookingData={BookingData} />
      <GetBookingsForWeek BookingData={BookingData} />
    </div>
  );
}

export default App;
