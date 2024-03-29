import React, { useState } from "react";
import "./check-styles.css";
const CheckAvailability = ({BookingData}) => {
  const [arg, setArg] = useState({
    roomId: "",
    startTime: "",
    endTime: "",
  });
  const [isBooked, setIsBooked] = useState(null);
  // const pushValue = (event) => {
  //   const { name, value } = event.target;
  //   setArg( ()=> {return { ...arg, [name]: value }} );  
  //   checkIsBooked (arg.roomId, arg.startTime, arg.endTime);

  // };
  const changeDate = (event) => {
    const { name, value } = event.target;
    setArg({ ...arg, [name]: value });
 
    ;

  };

    const newStartTimeForCheck = Date.parse(arg.startTime);
    const newEndTimeForCheck = Date.parse(arg.endTime);
    const forCheck = BookingData.filter(
      (room) => room.roomId === arg.roomId
    ).filter((time) =>       
    (Date.parse(time.startTime) <= newStartTimeForCheck &&
      Date.parse(time.endTime) > newStartTimeForCheck) |
    (Date.parse(time.startTime) < newEndTimeForCheck &&
      Date.parse(time.endTime) > newEndTimeForCheck) |
    (Date.parse(time.startTime) >= newStartTimeForCheck &&
      Date.parse(time.endTime) < newEndTimeForCheck)      
)
    ;
  const newStartTime = new Date(arg.startTime).toLocaleString();
  const newEndTime = new Date(arg.endTime).toLocaleString();
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
              onChange={changeDate}
              required
            >
              <option></option>
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
        </div>
      </form>
      <div className="frame">
        <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{arg.roomId}</td>
            <td>{newStartTime}</td>
            <td>{newEndTime}</td>
          </tr>
          </tbody>
        </table>
      </div>
      {arg.endTime === "" ? null : forCheck.length !== 0 ? (
        <h1 className="booked">Booked!</h1>
      ) : Date.parse(arg.startTime) >= Date.parse(arg.endTime) || Date.parse(arg.startTime) < Date.parse(new Date("2020-09-28")) ? (
        <h1 className="warn">Please choose the correct time</h1>
      ) : arg.roomId === "" ? (
        <h1 className="warn">Please select room</h1>
      ) : (
        <h1 className="avail">Available</h1>
      )}
    </div>
  );
};
export default CheckAvailability;
