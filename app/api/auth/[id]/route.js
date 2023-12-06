// Import necessary dependencies and modules
import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma client
const prisma = new PrismaClient();

// Define the PUT handler for user logout
export const PUT = async (req, { params }) => {
  try {
    // Extract user ID from the route parameters
    const userId = parseInt(params.id);

    // Check if a token record for the user already exists
    const existingToken = await prisma.token.findFirst({
      where: {
        userId,
        isDeleted: false,
      },
    });

    // If the user does not exist, return a not found response
    if (!existingToken) {
      return sendResponse(
        NextResponse,
        404,
        false,
        "User is already logged out."
      );
    }

    // Update the existing token record to mark it as deleted
    await prisma.token.update({
      where: { id: existingToken.id },
      data: {
        isDeleted: true,
        deletedAt: new Date(), // Set the deleted_at value to the current date
      },
    });

    // Return a success response with the updated user data
    return sendResponse(NextResponse, 200, true, "User logout successfully.");
  } catch (error) {
    // Handle any errors that occur during the user update process
    console.error("Error updating user:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};

export const GET = async (req, { params }) => {
  try {
    // Extract user ID from the route parameters
    const userId = parseInt(params.id);

    // Check if a token record for the user already exists
    const userWithTokensAndSelectedFields = await prisma.user.findUnique({
      where: {
        id: userId,
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

    // If the user does not exist, return a not found response
    if (!userWithTokensAndSelectedFields) {
      return sendResponse(NextResponse, 404, false, "User not found.");
    }

    // Return a success response with the updated user data
    return sendResponse(
      NextResponse,
      200,
      true,
      "User data fetched successfully.",
      userWithTokensAndSelectedFields
    );
  } catch (error) {
    // Handle any errors that occur during the user update process
    console.error("Error get user:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
