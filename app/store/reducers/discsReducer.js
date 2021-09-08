import {
  SET_USER_DISCS,
  SET_OVERVIEW_DISCS,
  SEARCH_DISCS,
  RESET_SEARCH,
  ADD_DISC_TO_BAG,
  REMOVE_DISC_FROM_BAG,
} from "../actions/discsActions";

const initialState = {
  userDiscs: [],
  overviewDiscs: [],
  searchResults: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DISCS:
      return {
        ...state,
        userDiscs: action.userDiscs,
      };
    case SET_OVERVIEW_DISCS:
      return {
        ...state,
        overviewDiscs: action.overviewDiscs,
      };
    case SEARCH_DISCS:
      return {
        ...state,
        searchResults: action.results,
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchResults: [],
      };
    case ADD_DISC_TO_BAG:
      return {
        ...state,
        userDiscs: [...state.userDiscs, action.newDiscResponse],
      };
    case REMOVE_DISC_FROM_BAG:
      const filteredArray = state.userDiscs.filter(
        (disc) => disc.id !== action.targetDiscId
      );
      return {
        ...state,
        userDiscs: filteredArray,
      };
    default:
      return state;
  }
};
