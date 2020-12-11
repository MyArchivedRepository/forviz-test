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
          (Date.parse(time.endTime) > newEndTime))
      );
    });
    setIsBooked(forCheck.length !== 0);
    return forCheck.length !== 0;
  };

  const submitOnClick = (event) => {
    checkAvailability(arg.roomId, arg.startTime, arg.endTime);
    setArg({
      roomId: arg.roomId,
      startTime: "",
      endTime: "",
    });
    event.preventDefault();
  };

  return (
    <div className="container">
      <h1>AVAILABILITY CHECK</h1>
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
            type="button"
            value="Submit"
            onClick={submitOnClick}
          ></input>
        </div>
      </form>
      {isBooked === null ? null : isBooked === true ? (
        <h1 className="booked">Booked!</h1>
      ) : arg.startTime === "" ? (
        <h1 className="warn">Please choose the correct time</h1>
      ) : (
        <h1 className="avail">Available</h1>
      )}
    </div>
  );
};

export default CheckAvailability;
