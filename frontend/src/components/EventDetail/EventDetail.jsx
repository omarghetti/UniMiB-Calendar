import React, { useCallback, useEffect, useState } from "react";
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
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import {
  getFormattedPropertyValue,
  getFormattedPropertyValues,
  getFormattedTimeInterval,
  typeMapper
} from "../../utils/eventUtils";
import Skeleton from "@material-ui/lab/Skeleton";
import { renderWhenReady } from "../../utils/renderUtils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

  const setFetchingCompleted = useCallback(() => {
    setIsFetching(false);
  }, []);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (e) {
        history.push(`/error/${e.response.status || "404"}`);
      } finally {
        setFetchingCompleted();
      }
    }

    fetchEvent();
  }, [eventId, history, setFetchingCompleted]);

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
          <Typography variant="subtitle1" className={classes.time}>
            <TimeIcon />
            &nbsp;
            {renderWhenReady(
              !isFetching,
              <Skeleton variant="text" width={270} />,
              <div className="event-time-interval">
                {getFormattedTimeInterval(event)}
              </div>
            )}
          </Typography>
        </Box>
      </Box>
    );
  }

  function renderDetail() {
    return (
      <Card className={classes.root}>
        <CardContent>
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
                  getFormattedPropertyValues(event.participants, "")
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
                  getFormattedPropertyValue(
                    event.attachments,
                    "Nessun luogo specificato"
                  )
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
                  getFormattedPropertyValues(
                    event.attachments,
                    "Nessun allegato"
                  )
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
                  getFormattedPropertyValue(event.notes, "Nessuna nota")
                )}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
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
