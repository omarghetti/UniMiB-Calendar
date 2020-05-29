import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Container from "@material-ui/core/Container";
import { Swipeable } from "react-swipeable";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { typeMapper } from "../../utils/eventUtils";
import * as R from "ramda";
import { AuthContext } from "../../contexts/AuthContext";
import TopBar from "../TopBar/TopBar";

function Calendar() {
  let history = useHistory();

  const calendarComponentRef = useRef(null);

  const [events, setEvents] = useState([]);
  let { user } = useContext(AuthContext);

  async function fetchEvents() {
    function addEventColor(e) {
      const styledEvent = e;
      const color = typeMapper[e.type].color;
      styledEvent.backgroundColor = color;
      styledEvent.borderColor = color;
      return styledEvent;
    }

    try {
      const response = await axios.get(`/api/events`);
      let events = response.data;
      events = events.map(addEventColor);
      setEvents(events);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [user]);

  function previous() {
    R.cond([[R.always, () => calendarComponentRef.current.getApi().prev()]])(
      calendarComponentRef.current
    );
  }

  function next() {
    R.cond([[R.always, () => calendarComponentRef.current.getApi().next()]])(
      calendarComponentRef.current
    );
  }

  function handleEventClick({ event }) {
    history.push(`calendar/${event.extendedProps._id}`);
  }

  function renderEvent(info) {
    // handle render event
  }

  return (
    <Fragment>
      <TopBar />
      <Swipeable
        onSwipedRight={previous}
        onSwipedLeft={next}
        preventDefaultTouchmoveEvent={true}
      >
        <Container className={"calendar-container"}>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin]}
            locale="it"
            weekends={false}
            height="parent"
            titleFormat={{ year: "numeric", month: "long" }}
            allDayText={"Tutto il giorno"}
            views={{
              dayGridMonth: {
                columnHeaderFormat: {
                  weekday: "narrow"
                }
              },
              timeGridWeek: {
                columnHeaderFormat: {
                  weekday: "short",
                  day: "numeric"
                }
              },
              timeGridDay: {
                columnHeaderFormat: {
                  month: "numeric",
                  weekday: "long",
                  day: "numeric"
                }
              }
            }}
            events={events}
            eventRender={renderEvent}
            eventClick={handleEventClick}
            buttonText={{
              today: "Oggi",
              month: "Mese",
              week: "Settimana",
              day: "Giorno",
              list: "Lista"
            }}
            header={{
              left: "dayGridMonth,timeGridWeek,timeGridDay, today",
              center: "title",
              right: "prev,next"
            }}
            footer={{
              left: "",
              center: "",
              right: "prev,next"
            }}
            ref={calendarComponentRef}
          />
        </Container>
      </Swipeable>
    </Fragment>
  );
}

export default Calendar;
