import { NextResponse } from "next/server";
import {
  privateRoutes,
  publicRoutes,
  DASHBOARD,
  LOGIN,
  DEFAULT_PATH,
} from "./routeConstant";
import { getUserDetails } from "./storage/user";
import { getToken, removeLocalData } from "./storage/token";
const isLoggedIn = () => {
  if (getToken() && getUserDetails()) {
    return true;
  } else {
    removeLocalData();
    return false;
  }
};
export const middleware = (req) => {
  const path = req.nextUrl.pathname;
  // const isAuthenticated = isLoggedIn();
  const isAuthenticated = true;

  // Check if the route is private
  if (privateRoutes.includes(path)) {
    // Check if user is authenticated (you can modify this based on your actual authentication logic)
    // const isAuthenticated = !!window.sessionStorage.getItem("access_token");

    if (!isAuthenticated) {
      // User is not authenticated, redirect to login
      const absoluteURL = new URL(LOGIN, req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // Check if the route is public
  if (publicRoutes.includes(path)) {
    // Check if user is authenticated, redirect to dashboard

    if (isAuthenticated && path === LOGIN) {
      const absoluteURL = new URL(DASHBOARD, req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // Handle default route based on authentication status
  if (path === DEFAULT_PATH) {
    if (isAuthenticated) {
      const absoluteURL = new URL(DASHBOARD, req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else {
      const absoluteURL = new URL(LOGIN, req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
};
