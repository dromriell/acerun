import Constants from "expo-constants";
import { REACT_APP_OPEN_WEATHER_API_KEY } from "../../env";

const { manifest } = Constants;

// export const uri = `http://${manifest.debuggerHost // LOCAL DEVELOPMENT URI
//   .split(`:`)
//   .shift()
//   .concat(`:8000`)}`;

export const uri = `https://dg-api-test.herokuapp.com`; // HEROKU TEST DEVELOPMENT URI

export const authEP = `${uri}/api-token-auth/`;

// DISC ENDPOINTS

export const discDetailEP = `${uri}/api/v1/discs/list/`;

export const userDiscsEP = `${uri}/api/v1/discs/user-discs/`;

export const searchDiscsEP = `${uri}/api/v1/discs/search/`;

// EVENT ENDPOINTS

export const eventHomeEP = `${uri}/api-pdga/auth/?events=`; // Param is state

// GAME ENDPOINTS

export const gameHistoryEP = `${uri}/api/v1/games/game-summary/`;
export const nearbyCoursesEP = (location) => {
  return `${uri}/api-pdga/auth/?courses&lat=${location.lat}&lng=${location.lng}`;
};
export const createGameEP = `${uri}/api/v1/games/list/`;
export const gameCourseDataEP = (courseId) =>
  `${uri}/api/v1/courses/list/${courseId}`;
export const currentGameEP = (gameId) => `${uri}/api/v1/games/list/${gameId}/`;
export const holeScoreEP = `${uri}/api/v1/games/hole_scores/`;

// THIRD PARTY ENDPOINTS

// Weather
export const weatherEP = (zipCode) =>
  `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${REACT_APP_OPEN_WEATHER_API_KEY}`;
