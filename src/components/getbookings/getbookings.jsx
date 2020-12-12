import React, { useState } from "react";

import "./getbookings-styles.css";

const GetBookingsForWeek = (props) => {
  const [bookings, setBookings] = useState();
  const [arg, setArg] = useState({
    roomId: "",
    period: "",
  });

  const pushValue = (event) => {
    const { name, value } = event.target;
    setArg({ ...arg, [name]: value });
  };

  const submitOnClick = (event) => {
    const getBookingsForWeek = (roomId, weekNo) => {
      const setToday = Date.parse("2019-09-28 00:00:00");
      const oneDayInMilSec = Date.parse("2019-09-29 00:00:00") - setToday;
  
      switch (weekNo) {
        case "today":
          var currentBooking = props.BookingData.filter(
            (room) => room.roomId === roomId
          ).filter(
            (time) =>
              (Date.parse(time.startTime) >= setToday) &
              (Date.parse(time.startTime) <= setToday + oneDayInMilSec)
          );
          break;
        case "thisweek":
          currentBooking = props.BookingData.filter(
            (room) => room.roomId === roomId
          ).filter(
            (time) =>
              (Date.parse(time.startTime) >= setToday) &
              (Date.parse(time.startTime) <= setToday + oneDayInMilSec * 7)
          );
          break;
        case "nextweek":
          currentBooking = props.BookingData.filter(
            (room) => room.roomId === roomId
          ).filter(
            (time) =>
              (Date.parse(time.startTime) >= setToday * 7) &
              (Date.parse(time.startTime) <= setToday + oneDayInMilSec * 14)
          );
          break;
        default:
          currentBooking = "No value found";
      }
      setBookings(currentBooking)
      
    };
    getBookingsForWeek(arg.roomId, arg.period)

    event.preventDefault();
  };

  return (
    <div className="container">
      <h1>CURRENT BOOKINGS</h1>
      <form onSubmit={submitOnClick}>
        <div className="dropdown-group">
          <div className="dropdown">
            <h2>SELECT ROOM</h2>
            <select
              className="select"
              name="roomId"
              onChange={pushValue}
              required
            >
              <option value=""></option>
              <option value="A101">A101</option>
              <option value="A102">A102</option>
              <option value="Auditorium">Auditorium</option>
            </select>
          </div>

          <div className="dropdown">
            <h2>SELECT PERIOD</h2>

            <select
              className="select"
              name="period"
              onChange={pushValue}
              required
            >
              <option value=""></option>
              <option value="today">Today</option>
              <option value="thisweek">This Week</option>
              <option value="nextweek">Next Week</option>
            </select>
          </div>
          <br></br>
          <input
            className="submit"
            type="submit"
          ></input>
        </div>
      </form>

      {bookings != null ? (
        <div className="table">
          <table>
          {bookings !== '' ?
            <tr>
              <th>Title</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
            : null }
            

            {bookings.map((map) => (
              <tr key={map.id}>
                <td>{map.title}</td>
                <td>{map.startTime}</td>
                <td>{map.endTime}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default GetBookingsForWeek;