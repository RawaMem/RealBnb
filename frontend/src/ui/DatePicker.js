import React, { useReducer } from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";
import "./ui.css";

//https://github.com/t0gre/react-datepicker/tree/master
export function datePickerReducer(state, action) {
    switch (action.type) {
        case "focusChange":
        return { ...state, focusedInput: action.payload };
        case "dateChange":
          // const { startDate, endDate } = action.payload;
          // let focusedInput = state.focusedInput;
          // if (startDate !== null && (endDate === null || +startDate === +endDate)) {
          //     focusedInput = 'endDate';
          // }
          // return { ...state, startDate: startDate, endDate: endDate, focusedInput: focusedInput };
          // console.log("%c this is the payload", "color: orange", action.payload);
        return action.payload;
        // return { ...state, ...action.payload };
        default:
        throw new Error();
    };
};


function DatePicker({ state, dispatch, isDateBlocked, daySize, setShowCalendar, updateWishlistDates }) {
// The isDateBlocked is a function that produces a boolean output. If this function returns 'true' for a specific date, that date will be blocked according to the conditions specified within the function.
// daySize takes in an array of (2) number elements, the number represent the width and height of the calendar dropdown. 
    return (
      <ThemeProvider
      theme={{
        breakpoints: ["40em", "48em", "64em"],
        reactDatepicker: {
          daySize: daySize,
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
          onDatesChange={(data) => {
            dispatch({ type: "dateChange", payload: data });
            console.log("%c what is going on here", "color: orange", data);
            if (data.endDate && setShowCalendar && updateWishlistDates) {
              setShowCalendar(false);
              updateWishlistDates(data);
            }
          }
          }
          onFocusChange={(focusedInput) =>
            dispatch({ type: "focusChange", payload: focusedInput })
          }
          startDate={state.startDate} // Date or null
          endDate={state.endDate} // Date or null
          focusedInput={state.focusedInput} // START_DATE, END_DATE or null
          style={{border: "none !important"}}
          minBookingDays={"2"}
          isDateBlocked={isDateBlocked}
        />
      </ThemeProvider>
    );
};

export default DatePicker;
