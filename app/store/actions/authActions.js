import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

import { authEP, profileEP, signUpEP } from "../../utils/apiEndPoints";

let timer;

export const authenticate = (userId, token, profile, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(180000)); DISPATCH TOKEN TIMEOUT WHEN AVAILABLE
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      profile: profile,
    });
  };
};

export const login = (username, password) => {
  const credentials = {
    username: username,
    password: password,
  };
  return async (dispatch) => {
    const response = await fetch(authEP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      let errorMsg = "";
      console.log(errorResponse);

      Object.entries(errorResponse).forEach(([key, value]) => {
        switch (key) {
          case "username":
            errorMsg = errorMsg + "Username is a required field. \n";
            return;
          case "password":
            errorMsg = errorMsg + "Password is a required field. \n";
            return;
          case "non_field_errors":
            errorMsg = errorMsg + value;
            return;
          default:
            errorMsg = errorMsg + value;
            return;
        }
      });
      console.log(errorMsg);
      throw Error(errorMsg || "An error occured!");
    }

    const authResponse = await response.json();

    console.log(authResponse);

    dispatch(
      authenticate(
        authResponse.user_id,
        authResponse.token,
        authResponse.profile
        // parseInt(authResponse.expiresIn) * 1000
      )
    );

    saveDataToStorage(
      authResponse.user_id,
      authResponse.token,
      authResponse.profile
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOG_OUT };
};

export const signUpUser = (signUpData) => {
  return async (dispatch) => {
    const response = await fetch(signUpEP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      let errorMsg = "";
      console.log(errorResponse);

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
      console.log(errorMsg);
      throw Error(errorMsg || "An error occured!");
    }
  };
};

export const updateProfile = (token, profileID, profileData) => {
  return async (dispatch) => {
    const response = await fetch(profileEP(profileID), {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      let errorMsg = "";
      console.log(errorResponse);

      Object.entries(errorResponse).forEach(([key, value]) => {
        switch (key) {
          case "username":
            errorMsg = errorMsg + "Username is a required field. \n";
            return;
          case "password":
            errorMsg = errorMsg + "Password is a required field. \n";
            return;
          case "non_field_errors":
            errorMsg = errorMsg + value;
            return;
          default:
            errorMsg = errorMsg + value;
            return;
        }
      });
      console.log(errorMsg);
      throw Error(errorMsg || "An error occured!");
    }

    const profileResponse = await response.json();

    dispatch({ type: UPDATE_PROFILE, profile: profileResponse });
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (userId, token, profile, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userId,
      token: token,
      profile: profile,
      // expiryDate: expirationDate.toISOString(),
    })
  );
};
