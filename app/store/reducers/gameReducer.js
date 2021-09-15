import {
  SET_GAME_COURSE,
  CLEAR_GAME_COURSE,
  CREATE_GAME,
  SET_COURSE_GAME_DATA,
} from "../actions/gameActions";

const initialState = {
  course: null,
  courseData: null,
  gameID: null,
  scorecardID: null,
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
    case CREATE_GAME:
      const currentUserScoreCard = action.gameData.players.filter(
        (scorecard) => {
          return scorecard.player === parseInt(action.currentUser);
        }
      );
      return {
        ...state,
        gameID: action.gameData.id,
        scorecardID: currentUserScoreCard[0].id,
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
