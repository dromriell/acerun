import { AUTHENTICATE, LOG_OUT } from "../actions/authActions";

const initialState = {
  userId: null,
  token: null,
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        profile: action.profile,
      };
    //  case SIGN_UP:
    //    return {
    //      ...state,
    //      token: action.token,
    //      userId: action.userId,
    //    };
    case LOG_OUT:
      console.log("initial state set");
      return initialState;
    default:
      return state;
  }
};
