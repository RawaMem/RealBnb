import React, { useReducer } from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";

export function datePickerReducer(state, action) {
    switch (action.type) {
        case "focusChange":
        return { ...state, focusedInput: action.payload };
        case "dateChange":
        return action.payload;
        default:
        throw new Error();
    };
};

function DatePicker({ state, dispatch}) {

    return (
      <ThemeProvider
      theme={{
        breakpoints: ["40em", "48em", "64em"],
        reactDatepicker: {
          daySize: [30, 35],
          fontFamily: "system-ui, -apple-system",
          colors: {
            accessibility: "pink",
            silverCloud: "rgb(113,113,113)",
            charcoal: "rgb(34,34,34)",
            selectedDay: "pink", // day cell background color when hover over
            primaryColor: "pink",
            darcula: "rgb(34,34,34)",
            mud:"rgb(34,34,34)", // arrow color
            greey: 'orange',
            // graci: 'black', // calender border
            white: 'white', // calendar background
            normalDayHover: 'pink',
          },
          resetDatesIconColor: "orange",
          dayFontSize: "0.7em",
          dayBorderColor: "white",
          inputActiveBoxShadow: " 0px 5px 5px 0px rgba(0, 0, 0, 0.2)",
          inputCalendarIconWidth: "25px",
          inputCalendarIconHeight: "15px",
          inputCalendarIconColor: "orange",
          datepickerBorderRadius: "10px",
        }
      }}
      >
        <DateRangeInput
          onDatesChange={(data) =>
            dispatch({ type: "dateChange", payload: data })
          }
          onFocusChange={(focusedInput) =>
            dispatch({ type: "focusChange", payload: focusedInput })
          }
          startDate={state.startDate} // Date or null
          endDate={state.endDate} // Date or null
          focusedInput={state.focusedInput} // START_DATE, END_DATE or null
          style={{border: "none !important"}}
          minBookingDays={"2"}
        />
      </ThemeProvider>
    );
};

export default DatePicker;
