import {
  SET_GAME_COURSE,
  CLEAR_GAME_COURSE,
  FETCH_WEATHER,
  SET_GAME_DATA,
  SET_COURSE_GAME_DATA,
  SET_HOLE_INDEX,
  ADD_STROKE,
  RESET_HOLE,
  SET_HOLE_SCORE,
  SET_GAME_END,
  RESET_GAME,
  EQUIP_DISC,
} from "../actions/gameActions";

const initialState = {
  course: null,
  courseData: null,
  weather: null,
  game: null,
  scorecard: null,
  currentHoleIndex: 0,
  currentStrokes: [],
  equippedDisc: null,
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
    case EQUIP_DISC:
      return {
        ...state,
        equippedDisc: action.disc,
      };
    case FETCH_WEATHER:
      return {
        ...state,
        weather: action.weather,
      };
    case SET_GAME_DATA:
      const currentUserScoreCard = action.gameData.players.filter(
        (scorecard) => {
          return scorecard.player === parseInt(action.currentUser);
        }
      );
      if (action.setIndex) {
        return {
          ...state,
          game: action.gameData,
          scorecard: currentUserScoreCard[0],
          currentHoleIndex: currentUserScoreCard[0].scores.length,
        };
      } else {
        return {
          ...state,
          game: action.gameData,
          scorecard: currentUserScoreCard[0],
        };
      }
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
      if (state.currentHoleIndex + 1 >= state.courseData.holes.length) {
        return state;
      }
      return {
        ...state,
        currentHoleIndex: state.currentHoleIndex + 1,
        currentStrokes: [],
      };
    case RESET_GAME:
      return initialState;
    case SET_GAME_END:
      return initialState;
    default:
      return state;
  }
};
