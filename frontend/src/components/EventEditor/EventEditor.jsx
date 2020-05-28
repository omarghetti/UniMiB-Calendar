import React, { useCallback, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import EventIcon from "@material-ui/icons/Event";
import TimeIcon from "@material-ui/icons/AccessTime";
import PeopleIcon from "@material-ui/icons/People";
import PlaceIcon from "@material-ui/icons/Place";
import NotesIcon from "@material-ui/icons/Notes";

const useStyles = makeStyles(theme => ({
  header: {
    flexGrow: 1
  },
  detail: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  fieldIcon: {
    alignSelf: "flex-end",
    textAlign: "center",
    marginBottom: "4px"
  },
  longTextFieldIcon: {
    alignSelf: "center",
    textAlign: "center",
    marginBottom: "32px"
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function EventEditor() {
  const classes = useStyles();
  const [newEvent, setNewEvent] = useState({
    title: "Nuovo evento",
    type: "",
    allDay: false,
    participants: [],
    place: ""
  });
  const [isFetching, setIsFetching] = useState(true);
  const [eventTypes, setEventTypes] = useState([]);
  const [userEmails, setUserEmails] = useState([]);

  const history = useHistory();

  const handleChange = (field, value) => {
    setNewEvent({
      ...newEvent,
      [field]: value
    });
  };

  const setFetchingCompleted = useCallback(() => {
    setIsFetching(false);
  }, []);

  useEffect(() => {
    async function fetchEventTypes() {
      try {
        const response = await axios.get("/api/events/types");
        const eventTypes = response.data;
        setEventTypes(eventTypes);
      } catch (e) {
        history.push(`/error/${e.response.status}`);
      } finally {
      }
    }

    async function fetchUserEmails() {
      try {
        const response = await axios.get("/api/users/emails");
        setUserEmails(response.data);
      } catch (e) {
        history.push(`/error/${e.response.status}`);
      }
    }

    fetchEventTypes();
    fetchUserEmails();
    setFetchingCompleted();
  }, [history, setFetchingCompleted]);

  function renderHeader() {
    return <div />;
  }

  function renderDetail() {
    return isFetching ? (
      <div />
    ) : (
      <div className={classes.detail}>
        <Grid container spacing={3}>
          <Grid item xs={1} className={classes.fieldIcon}>
            <EventIcon />
          </Grid>
          <Grid item xs={11}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newEvent.type}
                onChange={event => handleChange("type", event.target.value)}
              >
                {eventTypes.map(type => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1} className={classes.fieldIcon}>
            <TimeIcon />
          </Grid>
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                label="Inizio"
                inputVariant="standard"
                value={newEvent.start}
                onChange={value => handleChange("start", value.toISOString())}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={8}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                label="Fine"
                inputVariant="standard"
                value={newEvent.end}
                onChange={value => handleChange("end", value.toISOString())}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={1} className={classes.fieldIcon}>
            <PeopleIcon />
          </Grid>
          <Grid item xs={11}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Partecipanti</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={newEvent.participants}
                onChange={event =>
                  handleChange("participants", event.target.value)
                }
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {userEmails.map(email => (
                  <MenuItem key={email} value={email}>
                    {email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1} className={classes.fieldIcon}>
            <PlaceIcon />
          </Grid>
          <Grid item xs={11}>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="standard-required"
                label="Luogo"
                value={newEvent.place}
                onChange={event => handleChange("place", event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1} className={classes.longTextFieldIcon}>
            <NotesIcon />
          </Grid>
          <Grid item xs={11}>
            <FormControl className={classes.formControl}>
              <TextField
                id="standard-multiline-static"
                label="Note"
                multiline
                rows={4}
                value={newEvent.notes}
                onChange={event => handleChange("notes", event.target.value)}
              />
            </FormControl>
          </Grid>
          <FormControl>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  className={classes.button}
                >
                  Annulla
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Salva
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </div>
    );
  }

  return (
    <Container>
      {renderHeader()}
      {renderDetail()}
    </Container>
  );
}

export default EventEditor;
