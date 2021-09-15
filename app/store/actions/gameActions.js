import { createGameEP, gameCourseDataEP } from "../../utils/apiEndPoints";

export const SET_GAME_COURSE = "SET_GAME_COURSE";
export const CLEAR_GAME_COURSE = "CLEAR_GAME_COURSE";
export const CREATE_GAME = "CREATE_GAME";
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
      type: CREATE_GAME,
      gameData: newGameResponse,
      currentUser: currentUser,
    });
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
    console.log("Course Data Fetched!", courseDataResponse);
    dispatch({
      type: SET_COURSE_GAME_DATA,
      courseData: courseDataResponse,
    });
  };
};
