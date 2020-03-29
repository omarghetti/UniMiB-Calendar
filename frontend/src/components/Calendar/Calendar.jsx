import React, { Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "@material-ui/core/Container";
import TopBar from "../TopBar/TopBar";

function Calendar() {
  return (
    <Fragment>
      <TopBar />
      <Container>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          weekends={false}
          events={[
            { title: "event 1", date: "2019-04-01" },
            { title: "event 2", date: "2019-04-02" }
          ]}
        />
      </Container>
    </Fragment>
  );
}

export default Calendar;
