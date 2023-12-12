// app/api/route.js

// Import necessary dependencies and modules
import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { validateUserInput } from "@/api_helpers/validations/userValidation";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registrationEmailContent } from "@/api_helpers/helpers/mail";

// Initialize Prisma client
const prisma = new PrismaClient();

// Define the POST handler for user registration
export const POST = async (req) => {
  try {
    // Validate input data
    const data = await req.json();
    const {
      firstName = "",
      lastName = "",
      email = "",
      password = "",
      isCreatedByLeader = false,
      tripId = "",
    } = data;

    // Validate user input and check for errors
    const validationErrors = validateUserInput({
      firstName,
      lastName,
      email,
      password,
      isCreatedByLeader,
      tripId,
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
        where: { email, isDeleted: false },
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

    if (isCreatedByLeader) {
      const existingTrip = await prisma.trip.findUnique({
        where: { id: tripId, isDeleted: false },
      });

      if (!existingTrip) {
        return sendResponse(NextResponse, 400, false, "Trip is not exist.");
      }

      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      await prisma.participant.create({
        data: {
          userId: newUser.id,
          tripId: parseInt(tripId),
        },
      });
      await registrationEmailContent({ firstName, lastName, email, password });
      // Return a success response with the created user data
      return sendResponse(
        NextResponse,
        200,
        true,
        "Participant added successfully."
      );
    } else {
      // Create a new user in the database
      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      await registrationEmailContent({ firstName, lastName, email, password });
      // Return a success response with the created user data
      return sendResponse(
        NextResponse,
        200,
        true,
        "User created successfully."
      );
    }
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};

/**
 * Handle GET request to fetch paginated user records.
 * @param {IncomingMessage} req - The HTTP request object.
 * @returns {Promise<NextResponse>} - The HTTP response object.
 */
export const GET = async (req) => {
  try {
    // Extract pageNumber from the query parameters, default to 1 if not provided
    const { searchParams } = new URL(req.url);
    const pageNumber = searchParams.get("pageNumber") || 1;

    // Set limit for each page
    const limit = 1;

    // Calculate offset based on pageNumber and limit
    const offset = (pageNumber - 1) * limit;

    // Fetch total number of undeleted records
    const totalRecords = await prisma.user.count({
      where: { isDeleted: false },
    });

    // Calculate total number of pages
    const totalPages = Math.ceil(totalRecords / limit);

    // Fetch records for the current page, ordered by createdAt in descending order
    const records = await prisma.user.findMany({
      take: limit,
      skip: offset,
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    // Prepare the response object with pagination information
    const response = {
      totalRecords,
      totalPages,
      limit,
      page: pageNumber,
      records,
    };

    // Return a success response with the paginated user records
    return sendResponse(
      NextResponse,
      200,
      true,
      "User records fetched successfully.",
      response
    );
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching user records:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
