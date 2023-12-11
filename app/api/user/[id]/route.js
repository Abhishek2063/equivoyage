import { validateUpdateUserInput } from "@/api_helpers/validations/userValidation";
import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Initialize Prisma client
const prisma = new PrismaClient();

/**
 * Handle PUT request to update user data by ID.
 * @param {IncomingMessage} req - The HTTP request object.
 * @param {Object} params - The route parameters.
 * @returns {Promise<NextResponse>} - The HTTP response object.
 */
export const PUT = async (req, { params }) => {
  try {
    // Extract user ID from the route parameters
    const userId = parseInt(params.id);

    // Check if a user with the provided ID exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
        isDeleted: false, // Consider only undeleted users
      },
    });

    // If the user does not exist, return a not found response
    if (!existingUser) {
      return sendResponse(
        NextResponse,
        404,
        false,
        "User not found with the provided ID"
      );
    }

    // Validate input data
    const data = await req.json();
    const { firstName = "", lastName = "", email = "", password = "" } = data;

    // Validate user input and check for errors
    const validationErrors = validateUpdateUserInput({
      firstName,
      lastName,
      email,
      password,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(NextResponse, 400, false, "Validation errors", {
        errors: validationErrors,
      });
    }

    // Check if the email is being updated and if the new email already exists
    if (email !== existingUser.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email,
          isDeleted: false, // Consider only undeleted users
        },
      });

      if (emailExists) {
        return sendResponse(
          NextResponse,
          400,
          false,
          "Email already exists. Please use a different email."
        );
      }
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update only the provided data in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: firstName || existingUser.firstName,
        lastName: lastName || existingUser.lastName,
        email: email || existingUser.email,
        password: hashedPassword || existingUser.password,
      },
    });

    // Return a success response with the updated user data
    return sendResponse(
      NextResponse,
      200,
      true,
      "User updated successfully.",
      updatedUser
    );
  } catch (error) {
    // Handle any errors that occur during the user update process
    console.error("Error updating user:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};

export const DELETE = async (req, { params }) => {
  try {
    // Extract user ID from the route parameters
    const userId = parseInt(params.id);

    // Check if a user with the provided ID exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
        isDeleted: false, // Consider only undeleted users
      },
    });

    // If the user does not exist, return a not found response
    if (!existingUser) {
      return sendResponse(
        NextResponse,
        404,
        false,
        "User not found with the provided ID"
      );
    }

    // Update only the provided data in the database
    const deleteUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    // Return a success response with the updated user data
    return sendResponse(
      NextResponse,
      200,
      true,
      "User deleted successfully.",
      deleteUser
    );
  } catch (error) {
    // Handle any errors that occur during the user update process
    console.error("Error updating user:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
