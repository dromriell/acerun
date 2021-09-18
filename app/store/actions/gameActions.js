import {
  createGameEP,
  gameCourseDataEP,
  currentGameEP,
} from "../../utils/apiEndPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_GAME_COURSE = "SET_GAME_COURSE";
export const CLEAR_GAME_COURSE = "CLEAR_GAME_COURSE";
export const SET_GAME_DATA = "SET_GAME_DATA";
export const SET_COURSE_GAME_DATA = "SET_COURSE_GAME_DATA";

export const setGameCourse = (courseData) => {
  return async (dispatch) => {
    dispatch({ type: SET_GAME_COURSE, course: courseData });
  };
};

export const clearGameCourse = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_GAME_COURSE });
  };
};

export const createGame = (token, courseID, players, currentUser) => {
  return async (dispatch) => {
    const response = await fetch(createGameEP, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course: courseID,
        date: new Date(),
        players: players,
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

    const newGameResponse = await response.json();
    console.log("Game Created!", newGameResponse);
    dispatch({
      type: SET_GAME_DATA,
      gameData: newGameResponse,
      currentUser: currentUser,
    });
    saveGameStateToStorage(newGameResponse);
  };
};

export const fetchCurrentGameData = (token, gameId, currentUser) => {
  return async (dispatch) => {
    const response = await fetch(currentGameEP(gameId), {
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

    const currentGameResponse = await response.json();
    console.log("Found Game!", currentGameResponse);
    dispatch({
      type: SET_GAME_DATA,
      gameData: currentGameResponse,
      currentUser: currentUser,
    });
    saveGameStateToStorage(currentGameResponse);
    return currentGameResponse.course;
  };
};

export const setCourseGameData = (token, courseId) => {
  console.log("ACTION", courseId);
  return async (dispatch) => {
    const response = await fetch(gameCourseDataEP(courseId), {
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

    const courseDataResponse = await response.json();
    console.log("Course Data Fetched!", courseDataResponse);
    dispatch({
      type: SET_COURSE_GAME_DATA,
      courseData: courseDataResponse,
    });
  };
};

const saveGameStateToStorage = (gameData) => {
  AsyncStorage.setItem(
    "currentGame",
    JSON.stringify({
      gameData: gameData,
    })
  );
};
