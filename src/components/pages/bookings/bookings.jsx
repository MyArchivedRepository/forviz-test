import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useParams } from "react-router";
import {
  BookingDetail,
  BookingEachDay,
  NoBooking,
} from "./../../bookingdetail/bookingdetail";
import {
  DateTitle,
  DateHeader,
  DateTitleWholeMonth,
} from "./../../datetitle/datetiltle";
import BookingData from "../../../assets/current-bookings";
import "./bookings-styles.css";
const Bookings = () => {
  const bookings = BookingData;
  const { period } = useParams();
  const [selected, setSelected] = useState({
    thisweek: "",
    nextweek: "",
    wholemonth: "",
  });
  const query = useQuery();
  const roomId = query.get("roomId");

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const today = new Date("2020-09-28 12:00:00");
  const oneDayInMilSec = 86400000;
  const setDayOfMonth = (date) => {
    const curr = new Date(date);
    const firstDayOfMonth = new Date(curr.getFullYear(), curr.getMonth(), 1);
    const lastDayOfMonth = new Date(curr.getFullYear(), curr.getMonth() + 1);
    return { firstDayOfMonth: firstDayOfMonth, lastDayOfMonth: lastDayOfMonth };
  };
  const setDayOfWeek = (date) => {
    var currForGet = new Date(date);
    const first = currForGet.getDate() - currForGet.getDay() + 1;
    const firstdayOfWeek = new Date(new Date(date).setDate(first));
    const lastdayOfWeek = new Date(new Date(date).setDate(first + 6));
    return {
      firstdayOfWeek: firstdayOfWeek,
      lastdayOfWeek: lastdayOfWeek,
    };
  };
  const setTomorrow = (date) => {
    const tomorrow = new Date(
      new Date(date).setDate(new Date(date).getDate() + 1)
    );
    const afterTomorrow = new Date(
      new Date(date).setDate(new Date(date).getDate() + 2)
    );
    return {
      tomorrow: tomorrow,
      afterTomorrow: afterTomorrow,
    };
  };
  const { tomorrow, afterTomorrow } = setTomorrow(today);
  const { firstdayOfWeek, lastdayOfWeek } = setDayOfWeek(today);
  const { firstDayOfMonth, lastDayOfMonth } = setDayOfMonth(today);
  const getBookingsForWeek = (roomId, period) => {
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
      case "tomorrow":
        currentBooking = bookings
          .filter((room) => room.roomId === roomId)
          .filter(
            ({ startTime, endTime }) =>
              (Date.parse(startTime) >= Date.parse(today) + oneDayInMilSec &&
                Date.parse(startTime) <=
                  Date.parse(today) + oneDayInMilSec * 2) |
              (Date.parse(startTime) <= Date.parse(today) + oneDayInMilSec &&
                Date.parse(endTime) >= Date.parse(today) + oneDayInMilSec * 2)
          );
        break;
      case "aftertomorrow":
        currentBooking = bookings
          .filter((room) => room.roomId === roomId)
          .filter(
            ({ startTime, endTime }) =>
              (Date.parse(startTime) >=
                Date.parse(today) + oneDayInMilSec * 2 &&
                Date.parse(startTime) <=
                  Date.parse(today) + oneDayInMilSec * 3) |
              (Date.parse(startTime) <=
                Date.parse(today) + oneDayInMilSec * 2 &&
                Date.parse(endTime) >= Date.parse(today) + oneDayInMilSec * 3)
          );
        break;
      case "thisweek":
        currentBooking = bookings
          .filter((room) => room.roomId === roomId)
          .filter(
            ({ startTime, endTime }) =>
              (Date.parse(startTime) >= Date.parse(firstdayOfWeek) &&
                Date.parse(startTime) <=
                  Date.parse(lastdayOfWeek) + oneDayInMilSec) |
              (Date.parse(startTime) <= Date.parse(firstdayOfWeek) &&
                Date.parse(endTime) >= Date.parse(lastdayOfWeek))
          );
        break;
      case "nextweek":
        currentBooking = bookings
          .filter((room) => room.roomId === roomId)
          .filter(
            ({ startTime, endTime }) =>
              Date.parse(startTime) >=
                Date.parse(lastdayOfWeek) + oneDayInMilSec &&
              (Date.parse(startTime) <=
                Date.parse(lastdayOfWeek + oneDayInMilSec * 7)) |
                (Date.parse(startTime) <=
                  Date.parse(lastdayOfWeek) + oneDayInMilSec) &&
              Date.parse(endTime) >=
                Date.parse(lastdayOfWeek + oneDayInMilSec * 7 + oneDayInMilSec)
          );
        break;
      case "wholemonth":
        currentBooking = bookings
          .filter((room) => room.roomId === roomId)
          .filter(
            ({ startTime, endTime }) =>
              (Date.parse(startTime) >= Date.parse(firstDayOfMonth) &&
                Date.parse(startTime) <= Date.parse(lastDayOfMonth)) |
              (Date.parse(startTime) <= Date.parse(firstDayOfMonth) &&
                Date.parse(endTime) >= Date.parse(lastDayOfMonth))
          );
        break;
      case "all":
        currentBooking = bookings;
        break;
      default:
        currentBooking = [];
    }
    return currentBooking.sort(
      (a, b) => Date.parse(a.startTime) - Date.parse(b.startTime)
    );
  };
  const bookingsTodayEachRoom = getBookingsForWeek(roomId, "today").filter(
    (data) => data.roomId === roomId
  );
  const bookingsInPreiodEachRoom = getBookingsForWeek(roomId, period).filter(
    (data) => data.roomId === roomId
  );
  const bookingsTomorrowEachRoom = getBookingsForWeek(
    roomId,
    "tomorrow"
  ).filter((data) => data.roomId === roomId);
  const bookingsAfterTomorrowEachRoom = getBookingsForWeek(
    roomId,
    "aftertomorrow"
  ).filter((data) => data.roomId === roomId);
  const selectPeriod = (event) => {
    if (event.target.innerText === "THIS WEEK") {
      setSelected({
        thisweek: "selected",
        nextweek: "",
        wholemonth: "",
      });
    } else if (event.target.innerText === "NEXT WEEK") {
      setSelected({
        thisweek: "",
        nextweek: "selected",
        wholemonth: "",
      });
    } else {
      setSelected({
        thisweek: "",
        nextweek: "",
        wholemonth: "selected",
      });
    }
  };
  return (
    <div className="dashboard">
      <div className="upcoming">
        <div className="upcoming-header">
          <div className="upcoming-roomid">
            <div>
              <h1>{roomId}</h1>
            </div>
          </div>
          <div className="upcoming-content">
            <div className="upcoming-label">Upcoming</div>
            <DateHeader dateValue={today} />
          </div>
        </div>
        {bookingsTodayEachRoom.length === 0 ? (
          <NoBooking />
        ) : (
          <div className="upcoming-detail">
            <div className="wrapper">
              <BookingEachDay
                className="upcoming-comp"
                dayName="Today"
                dateValue={today}
                data={bookingsTodayEachRoom}
              />
            </div>
          </div>
        )}
      </div>
      <div className="bookings">
        <div>
          <div className="period-tab">
            <div>
              <Link to={`/bookings/thisweek?roomId=${roomId}`}>
                <div
                  className={`period-button ${selected.thisweek}`}
                  onClick={selectPeriod}
                >
                  <p>THIS WEEK</p>
                </div>
              </Link>
            </div>
            <div>
              <Link to={`/bookings/nextweek?roomId=${roomId}`}>
                <div
                  className={`period-button ${selected.nextweek}`}
                  onClick={selectPeriod}
                >
                  <p>NEXT WEEK</p>
                </div>
              </Link>
            </div>
            <div>
              <Link to={`/bookings/wholemonth?roomId=${roomId}`}>
                <div
                  className={`period-button ${selected.wholemonth}`}
                  onClick={selectPeriod}
                >
                  <p>WHOLE MONTH</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="barrier"></div>
          {period === "thisweek" ? (
            <div className="detail-container">
              <div>
                <DateTitle
                  data={bookingsTodayEachRoom}
                  dateValue={today}
                  title="Today"
                />
                <BookingEachDay
                  className="booking-comp"
                  dayName="Today"
                  dateValue={today}
                  data={bookingsTodayEachRoom}
                  etc="only-booking"
                />
              </div>
              <div>
                <DateTitle
                  data={bookingsTomorrowEachRoom}
                  dateValue={tomorrow}
                  title="Tomorrow"
                />
                <BookingEachDay
                  className="booking-comp"
                  dayName="Tomorrow"
                  dateValue={tomorrow}
                  data={bookingsTomorrowEachRoom}
                  etc="only-booking"
                />
              </div>
              <div>
                <DateTitle
                  data={bookingsAfterTomorrowEachRoom}
                  dateValue={afterTomorrow}
                  title="After Tomorrow"
                />
                <BookingEachDay
                  className="booking-comp"
                  data={bookingsAfterTomorrowEachRoom}
                  etc="only-booking"
                />
              </div>
              <div></div>
            </div>
          ) : period === "wholemonth" ? (
            <div>
              {bookingsInPreiodEachRoom.map(
                ({ id, startTime, endTime, title }) => (
                  <div key={id} className="bookingwholemonth">
                    <DateTitleWholeMonth
                      data={bookingsInPreiodEachRoom}
                      startTime={startTime}
                      endTime={endTime}
                    />
                    <div className="wmbooking-wrapper">
                      <BookingDetail
                        id={id}
                        startTime={startTime}
                        endTime={endTime}
                        title={title}
                        className="wholemonth"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
