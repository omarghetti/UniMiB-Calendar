import * as R from "ramda";
import { DateTime } from "luxon";

export const typeMapper = {
  GENERIC_MEETING: {
    label: "Incontro generico"
  },
  PROJECT_REVIEW: {
    label: "Revisione progetto",
    color: "#59ADFF"
  },
  THESIS_REVIEW: {
    label: "Revisione tesi",
    color: "#512da8"
  },
  LESSON_CLARIFICATIONS: {
    label: "Chiarimenti lezione",
    color: "#00796b"
  }
};

function formatDateInterval(date, preset) {
  return DateTime.fromISO(date)
    .setLocale("it")
    .toLocaleString(preset);
}

export function getFormattedTimeInterval(event) {
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

export function getFormattedPropertyValue(value, emptyPlaceholder) {
  return R.cond([
    [R.isEmpty, () => emptyPlaceholder],
    [R.T, R.identity]
  ])(value);
}

export function getFormattedPropertyValues(values, emptyPlaceholder) {
  return R.cond([
    [R.isEmpty, () => emptyPlaceholder],
    [R.T, R.join(", ")]
  ])(values);
}
