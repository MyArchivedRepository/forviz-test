import React from "react";
import "./booking-detail-styles.css";
const BookingDetail = ({ id, startTime, endTime, title, className, etc }) => {
  return (
    <div className={`booking-detail ${etc} ${className}`}>
      <div key={id}>
        <p>
          {new Intl.DateTimeFormat("en-DE", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(startTime))}{" "}
          -{" "}
          {new Intl.DateTimeFormat("en-DE", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(endTime))}
        </p>
        <h3>{title}</h3>
      </div>{" "}
    </div>
  );
};
const BookingEachDay = ({ data, className, etc }) => {
  return (
    <div className={className}>
      {data.map(({ id, startTime, endTime, title }) => (
        <BookingDetail
          key={id}
          id={id}
          startTime={startTime}
          endTime={endTime}
          title={title}
          className={className}
          etc={etc}
        />
      ))}
    </div>
  );
};
const NoBooking = () => {
  return (
    <div className="upcoming-detail">
      <h1>No Booking Today!</h1>
    </div>
  );
};
export { BookingDetail, BookingEachDay, NoBooking };
