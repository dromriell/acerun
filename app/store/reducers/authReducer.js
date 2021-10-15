import { AUTHENTICATE, LOG_OUT, UPDATE_PROFILE } from "../actions/authActions";

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
      return initialState;
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};
