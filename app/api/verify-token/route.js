import { verifyAccessToken } from "@/api_helpers/helpers/auth";
import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma client
const prisma = new PrismaClient();

/**
 * Handles the POST request for user authentication.
 *
 * @param {Object} req - The request object.
 * @returns {Promise<Object>} - A promise resolving to the response object.
 */
export const POST = async (req) => {
  try {
    // Parse request body as JSON
    const data = await req.json();
    const { token = "" } = data;

    // Verify the access token
    const decoded = await verifyAccessToken(token);

    // Check if the user has completed 2-factor authentication
    const userToken = await prisma.token.findUnique({
      where: {
        userId: decoded.id,
      },
    });

    if (!userToken) {
      // User has not completed 2-factor authentication, send an error response
      return sendResponse(NextResponse, 400, false, "Token does not exist.");
    }

    // Fetch user details with selected fields and associated tokens
    const userWithTokensAndSelectedFields = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        Token: {
          select: {
            id: true,
            token: true,
          },
        },
      },
    });

    // Send a successful response with user details
    sendResponse(
      NextResponse,
      200,
      true,
      "User login successful.",
      userWithTokensAndSelectedFields
    );
  } catch (error) {
    // Handle any errors that occur during the user login process
    console.error("Error during user login:", error);
    return sendResponse(
      NextResponse,
      500,
      false,
      "Internal server error occurred during login."
    );
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
