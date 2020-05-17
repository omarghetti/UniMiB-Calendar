import * as R from "ramda";
import moment from "moment";

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

function formatDateInterval(date, format) {
  return moment(date)
    .locale("it")
    .format(format);
}

export function getFormattedTimeInterval(event) {
  return R.cond([
    [
      R.always(event.allDay),
      () =>
        R.join(
          " - ",
          R.uniq([
            `${formatDateInterval(event.start, "DD MMMM YYYY")}`,
            `${formatDateInterval(event.end, "DD MMMM YYYY")}`
          ])
        )
    ],
    [
      R.T,
      () =>
        `${formatDateInterval(
          event.start,
          "DD MMMM YYYY, HH:mm"
        )} - ${formatDateInterval(event.end, "DD MMMM YYYY, HH:mm")}`
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
