import React, { useState } from "react";
import "./check-styles.css";

const CheckAvailability = (props) => {
  const [arg, setArg] = useState({
    roomId: "",
    startTime: "",
    endTime: "",
  });
  const [isBooked, setIsBooked] = useState(null);

  const pushValue = (event) => {
    const { name, value } = event.target;
    setArg({ ...arg, [name]: value });
  };

  const changeDate = (event) => {
    const { name, value } = event.target;
    setArg({ ...arg, [name]: value });
  };

  const checkAvailability = (roomId, inputStartTime, inputEndTime) => {
    const newStartTime = Date.parse(inputStartTime);
    const newEndTime = Date.parse(inputEndTime);
    const forCheck = props.BookingData.filter(
      (room) => room.roomId === roomId
    ).filter((time) => {
      return (
        ((Date.parse(time.startTime) <= newStartTime) &
          (Date.parse(time.endTime) > newStartTime)) |
        ((Date.parse(time.startTime) < newEndTime) &
          (Date.parse(time.endTime) > newEndTime)) |
          ((Date.parse(time.startTime) >= newStartTime)&(newEndTime > Date.parse(time.endTime)))
      );
    });
    setIsBooked(forCheck.length !== 0);
    return forCheck.length !== 0;
  };

  const submitOnClick = (event) => {
    checkAvailability(arg.roomId, arg.startTime, arg.endTime);
    setArg({ ...arg});
    event.preventDefault();
  };
  console.log(arg)
  console.log(isBooked)
  return (
    <div className="container">
      <h1>AVAILABILITY CHECK</h1>
      <form onSubmit={submitOnClick} target='_blank'>
        <div className="dropdown-group">
          <div className="dropdown">
            <h2>SELECT ROOM</h2>
            <select
              className="select"
              name="roomId"
              onChange={pushValue}
              required
            >
              <option ></option>
              <option value="A101">A101</option>
              <option value="A102">A102</option>
              <option value="Auditorium">Auditorium</option>
            </select>
            <br></br>
          </div>
        </div>
        <div className="dropdown-group">
          <h2>START TIME</h2>
          <input
            className="date"
            type="datetime-local"
            name="startTime"
            value={arg.startTime}
            onChange={changeDate}
            required
          />

          <h2>END TIME</h2>
          <input
            className="date"
            type="datetime-local"
            name="endTime"
            value={arg.endTime}
            onChange={changeDate}
            required
          />
          <br></br>
          <input
            className="submit"
            type="submit"
            value="Submit"

          ></input>
        </div>
      </form>
      {isBooked === null ? null : isBooked === true ? (
        <h1 className="booked">Booked!</h1>
      ) : Date.parse(arg.startTime) >= Date.parse(arg.endTime) ? (
        <h1 className="warn">Please choose the correct time</h1>
      ) : arg.roomId === '' ? <h1 className="warn">Please select room</h1>:(
        <h1 className="avail">Available</h1>
      )}
    </div>
  );
};

export default CheckAvailability;
