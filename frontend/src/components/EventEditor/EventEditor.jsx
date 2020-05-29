import React, { Fragment, useCallback, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LabelIcon from "@material-ui/icons/Label";
import TimeIcon from "@material-ui/icons/AccessTime";
import PeopleIcon from "@material-ui/icons/People";
import PlaceIcon from "@material-ui/icons/Place";
import NotesIcon from "@material-ui/icons/Notes";
import Box from "@material-ui/core/Box";
import { typeMapper } from "../../utils/eventUtils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import "moment/locale/it";

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
    minWidth: 240
  },
  formControlTitle: {
    margin: theme.spacing(2),
    minWidth: 280,
    "& div,label": {
      fontSize: 24
    }
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
  },
  checkboxField: {
    marginTop: "16px"
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
  moment.locale("it");
  const [newEvent, setNewEvent] = useState({
    title: "",
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

  function handleBackClick() {
    history.push("/calendar");
  }

  function renderDateTimeSection() {
    return (
      <Fragment>
        <Grid item sm={1} xs={1} className={classes.fieldIcon}>
          <TimeIcon />
        </Grid>
        <Grid item sm={2} xs={11}>
          <FormControlLabel
            className={classes.checkboxField}
            control={
              <Checkbox
                checked={newEvent.allDay}
                onChange={event => handleChange("allDay", event.target.checked)}
                name="allDay"
                color="primary"
              />
            }
            label="Tutto il giorno"
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <MuiPickersUtilsProvider
            utils={MomentUtils}
            libInstance={moment}
            locale={"it"}
          >
            {newEvent.allDay ? (
              <DatePicker
                label="Inizio"
                inputVariant="standard"
                format="DD/MM/YYYY"
                value={newEvent.start}
                onChange={value => handleChange("start", value.toISOString())}
              />
            ) : (
              <DateTimePicker
                label="Inizio"
                inputVariant="standard"
                format="DD/MM/YYYY hh:mm:ss"
                value={newEvent.start}
                onChange={value => handleChange("start", value.toISOString())}
              />
            )}
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item sm={7} xs={12}>
          {newEvent.allDay ? (
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                label="Fine"
                inputVariant="standard"
                format="DD/MM/YYYY"
                value={newEvent.end}
                onChange={value => handleChange("end", value.toISOString())}
              />
            </MuiPickersUtilsProvider>
          ) : (
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                label="Fine"
                inputVariant="standard"
                format="DD/MM/YYYY hh:mm:ss"
                value={newEvent.end}
                onChange={value => handleChange("end", value.toISOString())}
              />
            </MuiPickersUtilsProvider>
          )}
        </Grid>
      </Fragment>
    );
  }

  function renderDetail() {
    return isFetching ? (
      <div />
    ) : (
      <div className={classes.detail}>
        <Grid item xs={12}>
          <FormControl className={classes.formControlTitle}>
            <TextField
              id="standard"
              label="Titolo"
              value={newEvent.title}
              onChange={event => handleChange("title", event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={1} className={classes.fieldIcon}>
            <LabelIcon />
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
                    {typeMapper[type].label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {renderDateTimeSection()}
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
                id="standard"
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
        </Grid>

        <Box display="flex" justifyContent="flex-end" m={1} p={1}>
          <Box p={1}>
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              className={classes.button}
              onClick={handleBackClick}
            >
              Annulla
            </Button>
          </Box>
          <Box p={1}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Salva
            </Button>
          </Box>
        </Box>
      </div>
    );
  }

  return <Container>{renderDetail()}</Container>;
}

export default EventEditor;
