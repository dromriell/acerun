import { userDiscs } from "../../dummyData/userDiscs";

export const SET_DISCS = "SET_DISCS";

export const fetchUserDiscs = () => {
  console.log("HERE");
  return async (dispatch, getState) => {
    //  const userId = getState().auth.userId;
    try {
      console.log("Fetching...");
      const response = userDiscs;
      dispatch({ type: SET_DISCS, userDiscs: response });
    } catch (error) {
      throw error;
    }
  };
};
