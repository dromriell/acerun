import { SET_EVENTS } from "../actions/eventActions";

const initialState = {
  homeEvents: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      if (action.events[0] === "Access denied for user anonymous") {
        return { ...state };
      }
      return {
        ...state,
        homeEvents: action.events,
      };
    default:
      return state;
  }
};
