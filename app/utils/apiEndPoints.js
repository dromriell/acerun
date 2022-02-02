import { OPEN_WEATHER_API_KEY } from "@env";

export const uri = `https://dg-api-test.herokuapp.com`; // HEROKU TEST DEVELOPMENT URI

// AUTH & USER ENDPOINTS

export const authEP = `${uri}/api-token-auth/`;
export const profileEP = (id) => `${uri}/api/v1/profiles/list/${id}/`;
export const signUpEP = `${uri}/api/v1/users/list/`;

// DISC ENDPOINTS

export const discDetailEP = `${uri}/api/v1/discs/list/`;

export const userDiscsEP = `${uri}/api/v1/discs/user-discs/`;

export const searchDiscsEP = `${uri}/api/v1/discs/search/`;

// EVENT ENDPOINTS

export const eventHomeEP = `${uri}/api-pdga/auth/?events=`; // Param is state

// GAME ENDPOINTS

export const gameHistoryEP = `${uri}/api/v1/games/game-summary/`;
export const createGameEP = `${uri}/api/v1/games/list/`;
export const gameCourseDataEP = (courseId) =>
  `${uri}/api/v1/courses/list/${courseId}/`;
export const currentGameEP = (gameId) => `${uri}/api/v1/games/list/${gameId}/`;
export const holeScoreEP = `${uri}/api/v1/games/hole_scores/`;

// COURSES ENDPOINTS
export const nearbyCoursesEP = (location) => {
  return `${uri}/api-pdga/auth/?courses&lat=${location.lat}&lng=${location.lng}`;
};
export const searchCoursesEP = (term) =>
  `${uri}/api-pdga/auth/?courses-search&search-term=${term}`;

// ----- THIRD PARTY ENDPOINTS -----
// Weather
export const weatherEP = (zipCode) =>
  `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${OPEN_WEATHER_API_KEY}`;
