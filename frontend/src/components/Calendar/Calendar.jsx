import React, { Fragment, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Container from "@material-ui/core/Container";
import TopBar from "../TopBar/TopBar";
import Typography from "@material-ui/core/Typography";
import { Swipeable } from "react-swipeable";

function Calendar() {
  const [title, setTitle] = useState("");
  const calendarComponentRef = useRef(null);

  useEffect(() => {
    updateTitle();
  }, [calendarComponentRef]);

  function updateTitle() {
    if (calendarComponentRef.current) {
      const calendarApi = calendarComponentRef.current.getApi();
      setTitle(calendarApi.view.title);
    }
  }

  function previous() {
    if (calendarComponentRef.current) {
      const calendarApi = calendarComponentRef.current.getApi();
      calendarApi.prev();
    }
  }

  function next() {
    if (calendarComponentRef.current) {
      const calendarApi = calendarComponentRef.current.getApi();
      calendarApi.next();
    }
  }

  return (
    <Fragment>
      <TopBar />
      <Container className="calendar-container">
        <Typography variant="h6" align="center">
          {title.toUpperCase()}
        </Typography>
        <Swipeable
          onSwipedRight={previous}
          onSwipedLeft={next}
          preventDefaultTouchmoveEvent={true}
        >
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin]}
            locale="it"
            weekends={false}
            datesRender={updateTitle}
            events={[
              { title: "event 1", date: "2020-04-01" },
              { title: "event 2", date: "2020-04-02" }
            ]}
            buttonText={{
              today: "Oggi",
              month: "Mese",
              week: "Settimana",
              day: "Giorno",
              list: "Lista"
            }}
            header={{
              left: "dayGridMonth,timeGridWeek,timeGridDay",
              center: "",
              right: "prev,next"
            }}
            footer={{
              left: "",
              center: "",
              right: "prev,next"
            }}
            titleFormat={{ year: "numeric", month: "long" }}
            ref={calendarComponentRef}
          />
        </Swipeable>
      </Container>
    </Fragment>
  );
}

export default Calendar;
