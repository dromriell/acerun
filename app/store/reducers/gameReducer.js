import {
  SET_GAME_COURSE,
  CLEAR_GAME_COURSE,
  SET_GAME_DATA,
  SET_COURSE_GAME_DATA,
  SET_HOLE_INDEX,
  ADD_STROKE,
  RESET_HOLE,
  SET_HOLE_SCORE,
} from "../actions/gameActions";

const initialState = {
  course: null,
  courseData: null,
  game: null,
  scorecard: null,
  currentHoleIndex: 0,
  currentStrokes: [],
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
    case SET_HOLE_INDEX:
      return {
        ...state,
        currentHoleIndex: action.holeIndex,
      };
    case ADD_STROKE:
      const newStrokes = [...state.currentStrokes, action.strokeData];
      return {
        ...state,
        currentStrokes: newStrokes,
      };
    case RESET_HOLE:
      return {
        ...state,
        currentStrokes: [],
      };
    case SET_HOLE_SCORE:
      return {
        ...state,
        currentHoleIndex: state.currentHoleIndex + 1,
        currentStrokes: [],
      };
    default:
      return state;
  }
};
