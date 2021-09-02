import { SET_DISCS } from "../actions/discsActions";

const initialState = {
  userDiscs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DISCS:
      console.log(action.userDiscs);
      return {
        ...state,
        userDiscs: action.userDiscs,
      };
    default:
      return state;
  }
};
