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
import { DateTime } from "luxon";

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
  }
}));

function EventEditor() {
  const classes = useStyles();
  const [newEvent, setNewEvent] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [eventTypes, setEventTypes] = useState([]);
  const [startDate, setStartDate] = useState(
    DateTime.fromISO(new Date().toISOString())
  );
  const history = useHistory();

  const setFetchingCompleted = useCallback(() => {
    setIsFetching(false);
  }, []);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get("/api/events/types");
        setEventTypes(response.data);
      } catch (e) {
        history.push(`/error/${e.response.status}`);
      } finally {
        setFetchingCompleted();
      }
    }

    fetchEvent();
  }, [history, setFetchingCompleted]);

  function renderHeader() {
    return <div />;
  }

  const handleChange = (field, value) => {
    setNewEvent({
      ...newEvent,
      [field]: value
    });
  };

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
            value={startDate}
            onChange={setStartDate}
          />
        </MuiPickersUtilsProvider>
        <br />
        <br />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            label="Fine"
            inputVariant="standard"
            value={startDate}
            onChange={setStartDate}
          />
        </MuiPickersUtilsProvider>
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
