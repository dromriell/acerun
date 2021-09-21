import {
  createGameEP,
  gameCourseDataEP,
  currentGameEP,
  holeScoreEP,
} from "../../utils/apiEndPoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_GAME_COURSE = "SET_GAME_COURSE";
export const CLEAR_GAME_COURSE = "CLEAR_GAME_COURSE";
export const SET_GAME_DATA = "SET_GAME_DATA";
export const SET_COURSE_GAME_DATA = "SET_COURSE_GAME_DATA";
export const SET_HOLE_INDEX = "SET_HOLE_INDEX";
export const ADD_STROKE = "ADD_STROKE";
export const RESET_HOLE = "RESET_HOLE";
export const SET_HOLE_SCORE = "SET_HOLE_SCORE";
export const SET_GAME_END = "SET_GAME_END";
export const RESET_GAME = "RESET_GAME";

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

    dispatch({
      type: SET_GAME_DATA,
      gameData: newGameResponse,
      currentUser: currentUser,
    });
    saveGameStateToStorage(newGameResponse);
  };
};

export const fetchCurrentGameData = (
  token,
  gameId,
  currentUser,
  setIndex = true
) => {
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

    dispatch({
      type: SET_GAME_DATA,
      gameData: currentGameResponse,
      currentUser: currentUser,
      setIndex: setIndex,
    });
    saveGameStateToStorage(currentGameResponse);
    return currentGameResponse.course;
  };
};

export const setCourseGameData = (token, courseId) => {
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
    dispatch({
      type: SET_COURSE_GAME_DATA,
      courseData: courseDataResponse,
    });
  };
};

export const setHoleIndex = (holeIndex) => {
  return (dispatch) => {
    dispatch({
      type: SET_HOLE_INDEX,
      holeIndex: holeIndex,
    });
  };
};

export const addStroke = (strokeData) => {
  return (dispatch) => {
    dispatch({
      type: ADD_STROKE,
      strokeData: strokeData,
    });
  };
};

export const resetHole = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_HOLE,
    });
  };
};

export const resetGame = () => {
  return (dispatch) => {
    dispatch({ type: RESET_GAME });
    removeGameStateFromStorage();
  };
};

export const setHoleEnd = (token, holeScore) => {
  return async (dispatch) => {
    const response = await fetch(holeScoreEP, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(holeScore),
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

    dispatch({
      type: SET_HOLE_SCORE,
    });
  };
};

export const setGameEnd = (token, gameId) => {
  return async (dispatch) => {
    const response = await fetch(currentGameEP(gameId), {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInProgress: false }),
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

    dispatch({
      type: SET_GAME_END,
    });
    removeGameStateFromStorage();
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

const removeGameStateFromStorage = () => {
  try {
    AsyncStorage.removeItem("currentGame");
  } catch (error) {
    throw error;
  }
};
