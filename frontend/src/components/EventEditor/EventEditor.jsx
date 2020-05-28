import React, { useCallback, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NativeSelect from "@material-ui/core/NativeSelect";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

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
    place: "",
    notes: ""
  });
  const [isFetching, setIsFetching] = useState(true);
  const [eventTypes, setEventTypes] = useState([]);
  const [userEmails, setUserEmails] = useState([]);

  const history = useHistory();

  const handleChange = useCallback(
    (field, value) => {
      setNewEvent({
        ...newEvent,
        [field]: value
      });
    },
    [newEvent]
  );

  const setFetchingCompleted = useCallback(() => {
    setIsFetching(false);
  }, []);

  useEffect(() => {
    if (eventTypes) {
      handleChange("type", eventTypes[0]);
    }
  }, [eventTypes, handleChange]);

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
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">Tipo</InputLabel>
          <NativeSelect
            value={newEvent.type}
            onChange={event => handleChange("type", event.target.value)}
            inputProps={{
              name: "age",
              id: "age-native-helper"
            }}
          >
            {eventTypes.map(type => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <br />
        <br />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            label="Inizio"
            inputVariant="standard"
            value={newEvent.start}
            onChange={value => handleChange("start", value.toISOString())}
          />
        </MuiPickersUtilsProvider>
        <br />
        <br />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            label="Fine"
            inputVariant="standard"
            value={newEvent.end}
            onChange={value => handleChange("end", value.toISOString())}
          />
        </MuiPickersUtilsProvider>
        <br />
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">Partecipanti</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={newEvent.participants}
            onChange={event => handleChange("participants", event.target.value)}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
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
        <br />
        <br />

        <FormControl className={classes.formControl}>
          <TextField
            required
            id="standard-required"
            label="Luogo"
            value={newEvent.place}
            onChange={event => handleChange("place", event.target.value)}
          />
        </FormControl>
        <br />
        <br />

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
        <br />
        <br />
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </FormControl>
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
