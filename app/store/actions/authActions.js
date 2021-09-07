// import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOG_OUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8000/api-token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorId = errorResponse.error.message;
      console.log(errorId, errorResponse);
      throw Error("An error occured!");
    }

    const authResponse = await response.json();
    console.log(authResponse);
  };
};
