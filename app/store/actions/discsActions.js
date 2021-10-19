import { userDiscs } from "../../dummyData/userDiscs";

export const SET_USER_DISCS = "SET_USER_DISCS";
export const SET_OVERVIEW_DISCS = "SET_OVERVIEW_DISCS";
export const SEARCH_DISCS = "SEARCH_DISCS";
export const RESET_SEARCH = "RESET_SEARCH";
export const ADD_DISC_TO_BAG = "ADD_DISC_TO_BAG";
export const REMOVE_DISC_FROM_BAG = "REMOVE_DISC_FROM_BAG";
export const ADD_DISC_TO_COMPARE = "ADD_DISC_TO_COMPARE";

import { userDiscsEP, searchDiscsEP } from "../../utils/apiEndPoints";

export const fetchUserDiscs = (token) => {
  return async (dispatch) => {
    const response = await fetch(userDiscsEP, {
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
      throw Error(errorMsg || "An error occured!");
    }

    const userDiscResponse = await response.json();

    dispatch({ type: SET_USER_DISCS, userDiscs: userDiscResponse });
  };
};

export const fetchOverviewDiscs = () => {
  return async (dispatch) => {
    try {
      const response = userDiscs;
      dispatch({ type: SET_OVERVIEW_DISCS, overviewDiscs: response });
    } catch (error) {
      throw error;
    }
  };
};

export const searchDiscs = (token, term) => {
  return async (dispatch) => {
    const response = await fetch(`${searchDiscsEP}?term=${term}`, {
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
      throw Error(errorMsg || "An error occured!");
    }

    const resultsResponse = await response.json();

    dispatch({ type: SEARCH_DISCS, results: resultsResponse });
  };
};

export const addDiscToUserBag = (token, profileId, discId) => {
  return async (dispatch) => {
    const response = await fetch(userDiscsEP, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile: profileId,
        disc: discId,
      }),
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
      throw Error(errorMsg || "An error occured!");
    }

    const newDiscResponse = await response.json();
    dispatch({ type: ADD_DISC_TO_BAG, newDisc: newDiscResponse });
  };
};

export const removeDiscFromUserBag = (token, userDiscId) => {
  // Note that this takes the userDisc id, not the disc id.
  return async (dispatch) => {
    const response = await fetch(`${userDiscsEP}${userDiscId}/`, {
      method: "DELETE",
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
      throw Error(errorMsg || "An error occured!");
    }

    dispatch({ type: REMOVE_DISC_FROM_BAG, targetDiscId: userDiscId });
  };
};

export const resetSearch = () => {
  return (dispatch) => {
    dispatch({ type: RESET_SEARCH });
  };
};

export const addComparisonDisc = (placement, disc) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DISC_TO_COMPARE,
      placement: placement,
      comparisonDisc: disc,
    });
  };
};
