import { generateAccessToken } from "@/api_helpers/helpers/auth";
import { verifyToken } from "@/api_helpers/helpers/jwt";
import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma client
const prisma = new PrismaClient();

/**
 * Handles the refresh of an access token using a provided refresh token.
 * @param {object} req - The request object containing the refresh token in the request body.
 * @returns {NextResponse} - The Next.js response object indicating the success or failure of the token refresh.
 */
export const POST = async (req) => {
  try {
    const data = await req.json();
    const { refreshToken } = data;

    // Check if the refresh token is missing
    if (!refreshToken) {
      return sendResponse(
        NextResponse,
        400,
        false,
        "Missing refresh token"
      );
    }

    // Verify the refresh token
    const decoded = await verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    // If the refresh token is valid
    if (decoded) {
      // Check if the user exists and is not deleted
      const existingUser = await prisma.user.findFirst({
        where: {
          id: decoded.id,
          email: decoded.email,
          isDeleted: false,
        },
      });

      // If the user does not exist or is deleted, return an error response
      if (!existingUser) {
        return sendResponse(
          NextResponse,
          401,
          false,
          "Invalid email or password."
        );
      }

      // Compose a session object from the decoded token
      const session = {
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
      };

      // Generate a new access token
      const token = generateAccessToken(session);

      // Return a success response with the new access token
      return sendResponse(
        NextResponse,
        200,
        true,
        "Token refresh success",
        {
          user: decoded,
          token,
        }
      );
    }
  } catch (error) {
    // Handle any errors that occur during the token refresh process
    console.error("Error during token refresh:", error);
    return sendResponse(
      NextResponse,
      500,
      false,
      "Internal server error occurred during token refresh."
    );
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
