import React from "react";
import {Route,Switch} from 'react-router-dom'

import BookingData from "../../../assets/current-bookings";
import CheckAvailability from "../../check/check";
import GetBookingsForWeek from "../../getbookings/getbookings";



function Home() {
  return (
    <div className="App">
      <CheckAvailability BookingData={BookingData} />
      <GetBookingsForWeek BookingData={BookingData} />

    </div>
  );
}

export default Home;
