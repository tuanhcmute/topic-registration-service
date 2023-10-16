import keys from "../../config";

export const API_BASE_URL = keys.apiBaseUrl;

export const ACCESS_TOKEN = "accessToken";

export const OAUTH2_REDIRECT_URI = keys.redirectUri;

export const GOOGLE_AUTH_URL =
  API_BASE_URL +
  "/api/v1/oauth2/authorization/google?redirect_url=" +
  OAUTH2_REDIRECT_URI;

export { default as headers } from "./headers";
export { default as paths } from "./paths";
