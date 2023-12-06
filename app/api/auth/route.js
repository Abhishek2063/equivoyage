// Import necessary dependencies and modules
import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { validateLoginInput } from "@/api_helpers/validations/loginValidation";
import jwt from "jsonwebtoken";

// Initialize Prisma client
const prisma = new PrismaClient();

// Define the POST handler for user login
export const POST = async (req) => {
  try {
    // Validate input data
    const data = await req.json();
    const { email = "", password = "" } = data;

    // Validate user input and check for errors
    const validationErrors = validateLoginInput({
      email,
      password,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(NextResponse, 400, false, "Validation errors", {
        errors: validationErrors,
      });
    }

    // Check if the user with the provided email exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
        isDeleted: false, // Consider only undeleted users
      },
    });

    // If the user does not exist, return an error response
    if (!existingUser) {
      return sendResponse(NextResponse, 401, false, "Invalid credentials.");
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    // If passwords do not match, return an error response
    if (!passwordMatch) {
      return sendResponse(NextResponse, 401, false, "Invalid credentials.");
    }

    // Create a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET_KEY
    );

    // Check if a token record for the user already exists
    const existingToken = await prisma.token.findFirst({
      where: {
        userId: existingUser.id,
      },
    });

    if (existingToken) {
      // Update the existing token record
      await prisma.token.update({
        where: { id: existingToken.id },
        data: {
          token,
          isDeleted: false,
          deletedAt: null, // Reset the deleted_at value
        },
      });
    } else {
      // Create a new token record
      await prisma.token.create({
        data: {
          userId: existingUser.id,
          token,
        },
      });
    }

    // Return a success response with the created user data
    return sendResponse(NextResponse, 200, true, "User Login successfully.", {
      user: existingUser,
      token,
    });
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
