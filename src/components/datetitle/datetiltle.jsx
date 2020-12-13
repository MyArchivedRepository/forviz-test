import React from "react";
import "./datetitle-styles.css";
const DateTitle = ({ title, dateValue, data }) => {
  return (
    <div>
      {data.length === 0 ? null : (
        <div className="datetitle">
          <h3>
            {`${title} `}
            <span>{`(${new Intl.DateTimeFormat("en-TH", {
              weekday: "long",
            }).format(dateValue)},${new Intl.DateTimeFormat("en-DE", {
              day: "numeric",
              month: "short",
            }).format(dateValue)})`}</span>
          </h3>
        </div>
      )}
    </div>
  );
};
const DateHeader = ({ dateValue }) => {
  return (
    <div>
      <div>
        <h1 className="longday">
          {new Intl.DateTimeFormat("en-TH", { weekday: "long" }).format(
            dateValue
          )}
        </h1>
      </div>
      <div>
        <h1>
          {new Intl.DateTimeFormat("en-DE", {
            day: "numeric",
            month: "short",
          }).format(dateValue)}
        </h1>
      </div>
    </div>
  );
};
const DateTitleWholeMonth = ({ data, startTime, endTime }) => {
  return (
    <div>
      {data.length === 0 ? null : (
        <div className="datetitle">
          <h3>
            {new Date(startTime).getDate() === new Date(endTime).getDate() ? (
              <span>{`${new Intl.DateTimeFormat("en-TH", {
                weekday: "long",
              }).format(new Date(startTime))},${new Intl.DateTimeFormat(
                "en-DE",
                {
                  day: "numeric",
                  month: "short",
                }
              ).format(new Date(startTime))}`}</span>
            ) : (
              <span>{`${new Intl.DateTimeFormat("en-TH", {
                weekday: "long",
              }).format(new Date(startTime))},${new Intl.DateTimeFormat(
                "en-DE",
                {
                  day: "numeric",
                  month: "short",
                }
              ).format(new Date(endTime))} to ${new Intl.DateTimeFormat(
                "en-TH",
                {
                  weekday: "long",
                }
              ).format(new Date(endTime))},${new Intl.DateTimeFormat("en-DE", {
                day: "numeric",
                month: "short",
              }).format(new Date(endTime))}`}</span>
            )}
          </h3>
        </div>
      )}
    </div>
  );
};
export { DateTitle, DateHeader, DateTitleWholeMonth };
