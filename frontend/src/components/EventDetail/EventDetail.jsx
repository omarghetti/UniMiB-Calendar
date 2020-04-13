import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import EventIcon from "@material-ui/icons/Event";
import TimeIcon from "@material-ui/icons/AccessTime";
import PeopleIcon from "@material-ui/icons/People";
import PlaceIcon from "@material-ui/icons/Place";
import NotesIcon from "@material-ui/icons/Notes";
import AttachmentIcon from "@material-ui/icons/AttachFile";
import ListItemText from "@material-ui/core/ListItemText";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as R from "ramda";
import { DateTime } from "luxon";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  time: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function EventDetail() {
  const classes = useStyles();
  let { eventId } = useParams();
  const [event, setEvent] = useState({ participants: [], attachments: [] });

  useEffect(() => {
    async function fetchEvent() {
      const response = await axios(`/api/events/${eventId}`);
      setEvent(response.data);
      console.info({ response });
    }

    fetchEvent();
  }, [eventId]);

  function formatDate(date) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
  }

  function formatValue(value, emptyPlaceholder) {
    return R.cond([
      [R.isEmpty, () => emptyPlaceholder],
      [R.T, R.identity]
    ])(value);
  }

  function formatValues(list, emptyPlaceholder) {
    return R.reduce(
      (acc, val) => acc.concat(`, ${val}`),
      [emptyPlaceholder],
      list
    );
  }

  return (
    <Container>
      <Typography variant="h4">{event.title}</Typography>
      <Typography variant="h6" className={classes.time}>
        <TimeIcon />
        &nbsp;{`${formatDate(event.start)} - ${formatDate(event.end)}`}
      </Typography>

      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <EventIcon />
          </ListItemAvatar>
          <ListItemText primary="Tipo" secondary={event.type} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <PeopleIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Partecipanti"
            secondary={formatValues(event.participants, "Tu")}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <PlaceIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Luogo"
            secondary={formatValue(
              event.attachments,
              "Nessun luogo specificato"
            )}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <AttachmentIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Allegati"
            secondary={formatValues(event.attachments, "Nessun allegato")}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <NotesIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Note"
            secondary={formatValue(event.notes, "Nessuna nota")}
          />
        </ListItem>
      </List>
    </Container>
  );
}

export default EventDetail;
