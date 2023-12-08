import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { validateTripCreateInput } from "@/api_helpers/validations/tripValidation";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma client
const prisma = new PrismaClient();

// Define the POST handler
export const POST = async (req) => {
  try {
    // Parse JSON data from the request body
    const data = await req.json();
    const { tripName = "", startDate = "", endDate = "", leaderId = "" } = data;

    // Validate trip input and check for errors
    const validationErrors = validateTripCreateInput({
      tripName,
      startDate,
      endDate,
      leaderId,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(NextResponse, 400, false, "Validation errors", {
        errors: validationErrors,
      });
    }

    // Create a new trip in the database using Prisma
    const tripCreateData = await prisma.trip.create({
      data: {
        tripName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        leaderId: parseInt(leaderId),
      },
    });

    await prisma.participant.create({
      data: {
        userId: parseInt(leaderId),
        tripId: parseInt(tripCreateData.id),
      },
    });

    // Return a success response after successfully creating the trip
    return sendResponse(
      NextResponse,
      200,
      true,
      "Trip data stored successfully."
    );
  } catch (error) {
    // Handle any errors that occur during the trip creation process
    console.error("Error creating trip:", error);

    // Return an error response for internal server errors
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
