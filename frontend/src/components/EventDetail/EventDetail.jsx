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
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import * as R from "ramda";
import { DateTime } from "luxon";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { typeMapper } from "../../utils/eventUtils";
import Skeleton from "@material-ui/lab/Skeleton";
import { renderWhenReady } from "../../utils/renderUtils";

const useStyles = makeStyles(theme => ({
  header: {
    flexGrow: 1
  },
  time: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary
  },
  detail: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function EventDetail() {
  const classes = useStyles();
  const history = useHistory();
  let { eventId } = useParams();
  const [event, setEvent] = useState({ participants: [], attachments: [] });
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (e) {
        history.push(`/error/${e.response.status}`);
      } finally {
        setIsFetching(false);
      }
    }

    fetchEvent();
  }, [eventId, history]);

  function renderTimeInterval() {
    return R.cond([
      [
        R.always(event.allDay),
        () =>
          R.join(
            " - ",
            R.uniq([
              `${formatDateInterval(event.start, DateTime.DATE_FULL)}`,
              `${formatDateInterval(event.end, DateTime.DATE_FULL)}`
            ])
          )
      ],
      [
        R.T,
        () =>
          `${formatDateInterval(
            event.start,
            DateTime.DATETIME_MED
          )} - ${formatDateInterval(event.end, DateTime.DATETIME_MED)}`
      ]
    ])();
  }

  function formatDateInterval(date, preset) {
    return DateTime.fromISO(date).toLocaleString(preset);
  }

  function formatValue(value, emptyPlaceholder) {
    return R.cond([
      [R.isEmpty, () => emptyPlaceholder],
      [R.T, R.identity]
    ])(value);
  }

  function formatValues(values, emptyPlaceholder) {
    return R.cond([
      [R.isEmpty, () => emptyPlaceholder],
      [R.T, R.join(", ")]
    ])(values);
  }

  function handleBackClick() {
    history.push("/calendar");
  }

  function renderHeader() {
    return (
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <Box
          pt={1}
          pb={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <IconButton
            color="primary"
            aria-label="back"
            onClick={handleBackClick}
          >
            <ArrowBack fontSize="large" />
          </IconButton>
        </Box>
        <Box p={1}>
          <Typography variant="h5">
            {renderWhenReady(
              !isFetching,
              <Skeleton variant="text" width={270} />,
              event.title
            )}
          </Typography>
          <Typography variant="h6" className={classes.time}>
            <TimeIcon />
            &nbsp;
            {renderWhenReady(
              !isFetching,
              <Skeleton variant="text" width={270} />,
              renderTimeInterval()
            )}
          </Typography>
        </Box>
      </Box>
    );
  }

  function renderDetail() {
    return (
      <List className={classes.detail}>
        <ListItem>
          <ListItemAvatar>
            <EventIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Tipo"
            secondary={renderWhenReady(
              !isFetching,
              <Skeleton variant="text" width={270} />,
              typeMapper[event.type]?.label
            )}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <PeopleIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Partecipanti"
            secondary={renderWhenReady(
              !isFetching,
              <Skeleton variant="text" width={270} />,
              formatValues(event.participants, "")
            )}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <PlaceIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Luogo"
            secondary={renderWhenReady(
              !isFetching,
              <Skeleton variant="text" width={270} />,
              formatValue(event.attachments, "Nessun luogo specificato")
            )}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <AttachmentIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Allegati"
            secondary={renderWhenReady(
              !isFetching,
              <Skeleton variant="text" width={270} />,
              formatValues(event.attachments, "Nessun allegato")
            )}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <NotesIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Note"
            secondary={renderWhenReady(
              !isFetching,
              <Skeleton variant="text" width={270} />,
              formatValue(event.notes, "Nessuna nota")
            )}
          />
        </ListItem>
      </List>
    );
  }

  return (
    <Container>
      {renderHeader()}
      {renderDetail()}
    </Container>
  );
}

export default EventDetail;
