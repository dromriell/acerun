import {
  SET_GAME_COURSE,
  CLEAR_GAME_COURSE,
  SET_GAME_DATA,
  SET_COURSE_GAME_DATA,
} from "../actions/gameActions";

const initialState = {
  course: null,
  courseData: null,
  game: null,
  scorecard: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_COURSE:
      return {
        ...state,
        course: action.course,
      };
    case CLEAR_GAME_COURSE:
      return {
        ...state,
        course: null,
      };
    case SET_GAME_DATA:
      const currentUserScoreCard = action.gameData.players.filter(
        (scorecard) => {
          return scorecard.player === parseInt(action.currentUser);
        }
      );
      return {
        ...state,
        game: action.gameData,
        scorecard: currentUserScoreCard[0],
      };
    case SET_COURSE_GAME_DATA:
      return {
        ...state,
        courseData: action.courseData,
      };
    default:
      return state;
  }
};
