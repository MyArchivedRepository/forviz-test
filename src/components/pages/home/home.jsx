import React from "react";
import { Link } from "react-router-dom";
import BookingData from "../../../assets/current-bookings";
import CheckAvailability from "../../check/check";
import GetBookingsForWeek from "../../getbookings/getbookings";
import './home-styles.css'
function Home() {
  return (
    <div className="Home">
      <div className="linktobookings">
        <Link to="/bookings/wholemonth?roomId=A101">See Curent Booking</Link>
      </div>
      <CheckAvailability BookingData={BookingData} />
      <GetBookingsForWeek BookingData={BookingData} />
    </div>
  );
}
export default Home;
