export const SET_EVENTS = "SET_EVENT";

import { eventHomeEP } from "../../utils/apiEndPoints";
import { logout } from "./authActions";

export const fetchHomeEvents = (token, location) => {
  return async (dispatch) => {
    const response = await fetch(`${eventHomeEP}${location}`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      let errorMsg = "";

      Object.entries(errorResponse).forEach(([key, value]) => {
        switch (key) {
          case "non_field_errors":
            errorMsg = errorMsg + value;
            return;
          default:
            errorMsg = errorMsg + value;
            return;
        }
      });
      if (errorMsg === "Invalid token.") {
        logout();
        return;
      }
      throw Error(errorMsg || "An error occured!");
    }

    const eventResponse = await response.json();

    dispatch({ type: SET_EVENTS, events: eventResponse });
  };
};
