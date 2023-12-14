export const LOGIN = "/auth/login";
export const DEFAULT_PATH = "/";
export const REGISTRATION = "/auth/register";
export const DASHBOARD = "/dashboard";
export const API_CREATE_USER = "/api/user/";
export const API_LOGIN_USER = "/api/auth";

export const publicRoutes = [LOGIN, DEFAULT_PATH, REGISTRATION];

export const privateRoutes = [DASHBOARD];

export const publicAPIRoutes = [API_CREATE_USER, API_LOGIN_USER];

export const privateAPIRoutes = [];
