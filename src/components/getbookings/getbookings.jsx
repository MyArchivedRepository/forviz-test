import React, { useState } from "react";
import "./getbookings-styles.css";
const GetBookingsForWeek = (props) => {
  const [arg, setArg] = useState({
    roomId: "",
    period: "",
  });
  const bookings = props.BookingData;
  const today = new Date("2020-09-28");
  const curr = new Date("2020-09-28");
  const first = curr.getDate() - curr.getDay() + 1;
  const last = first + 7;
  const firstdayOfWeek = new Date(curr.setDate(first));
  const lastdayOfWeek = new Date(curr.setDate(last));
  const oneDayInMilSec =
  Date.parse(new Date("2020-09-28")) - Date.parse(new Date("2020-09-27"));
  const getBookingsForWeeks = (roomId, period) => {
    switch (period) {
      case "today":
        var currentBooking = bookings
          .filter((room) => room.roomId === roomId)
          .filter(
            ({ startTime, endTime }) =>
              (Date.parse(startTime) >= Date.parse(today) &&
                Date.parse(startTime) <= Date.parse(today) + oneDayInMilSec) |
              (Date.parse(startTime) <= Date.parse(today) &&
                Date.parse(endTime) >= Date.parse(today) + oneDayInMilSec)
          );
        break;
      case "thisweek":
        currentBooking = bookings
          .filter((room) => room.roomId === roomId)
          .filter(
            ({ startTime, endTime }) =>
              (Date.parse(startTime) >= Date.parse(firstdayOfWeek) &&
                Date.parse(startTime) <= Date.parse(lastdayOfWeek)) |
              (Date.parse(startTime) <= Date.parse(firstdayOfWeek) &&
                Date.parse(endTime) >= Date.parse(lastdayOfWeek))
          );
        break;
      case "nextweek":
        currentBooking = bookings
          .filter((room) => room.roomId === roomId)
          .filter(
            ({ startTime, endTime }) =>
              Date.parse(startTime) >= Date.parse(lastdayOfWeek) &&
              (Date.parse(startTime) <=
                Date.parse(lastdayOfWeek + oneDayInMilSec * 7)) |
                (Date.parse(startTime) <= Date.parse(lastdayOfWeek)) &&
              Date.parse(endTime) >=
                Date.parse(lastdayOfWeek + oneDayInMilSec * 7)
          );
        break;
      case "all":
        currentBooking = bookings;
        break;
      default:
        currentBooking = [];
    }
    return currentBooking;
  };
  const pushValue = (event) => {
    const { name, value } = event.target;
    setArg({ ...arg, [name]: value });
  };
  const filteredBookings = getBookingsForWeeks(arg.roomId, arg.period);
  return (
    <div className="container">
      <h1>CURRENT BOOKINGS</h1>
      <form>
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
        </div>
      </form>
      {filteredBookings.length !== 0 ? (
        <div className="table">
          <table>
            {filteredBookings.length !== 0 ? (
              <thead>
              <tr>
                <th>Title</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
              </thead>
            ) : null}
              <tbody>
            {filteredBookings.map((map) => (
              <tr key={map.id}>
                <td>{map.title}</td>
                <td>{map.startTime}</td>
                <td>{map.endTime}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};
export default GetBookingsForWeek;
