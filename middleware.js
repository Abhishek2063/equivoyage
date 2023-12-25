"use client";
import { NextResponse } from "next/server";
import {
  privateRoutes,
  publicRoutes,
  DASHBOARD,
  LOGIN,
  DEFAULT_PATH,
} from "./routeConstant";

const isLoggedIn = async (req) => {
  return (
    req.cookies.has('ACCESS_TOKEN') &&
    req.cookies.has('typeData')
  );
};

export const middleware = async (req) => {
  const path = req.nextUrl.pathname;
  const isAuthenticated = await isLoggedIn(req);

  // Check if the route is private
  if (privateRoutes.includes(path)) {
    if (!isAuthenticated) {
      // User is not authenticated, redirect to login
      const absoluteURL = new URL(LOGIN, req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // Check if the route is public
  if (publicRoutes.includes(path)) {
    if (isAuthenticated && path === LOGIN) {
      // User is authenticated and trying to access the login page, redirect to dashboard
      const absoluteURL = new URL(DASHBOARD, req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // Handle the default route based on authentication status
  if (path === DEFAULT_PATH) {
    const redirectPath = isAuthenticated ? DASHBOARD : LOGIN;
    const absoluteURL = new URL(redirectPath, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
};
