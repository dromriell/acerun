import Constants from "expo-constants";
const { manifest } = Constants;

export const uri = `http://${manifest.debuggerHost // DEVELOPMENT URI
  .split(`:`)
  .shift()
  .concat(`:8000`)}`;

export const authEP = `${uri}/api-token-auth/`;

export const discDetailEP = `${uri}/api/v1/discs/list/`;

export const userDiscsEP = `${uri}/api/v1/discs/user-discs/`;

export const searchDiscsEP = `${uri}/api/v1/discs/search/`;
