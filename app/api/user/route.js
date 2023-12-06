// app/api/route.js

// Import necessary dependencies and modules
import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { validateUserInput } from "@/api_helpers/validations/userValidation";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Initialize Prisma client
const prisma = new PrismaClient();

// Define the POST handler for user registration
export const POST = async (req) => {
  try {
    // Validate input data
    const data = await req.json();
    const { firstName = "", lastName = "", email = "", password = "" } = data;

    // Validate user input and check for errors
    const validationErrors = validateUserInput({
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

    // Check if the email already exists in the database
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      // If the email is already taken, return an error response
      if (existingUser) {
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

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Return a success response with the created user data
    return sendResponse(
      NextResponse,
      200,
      true,
      "User created successfully.",
      newUser
    );
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
