import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { validateTripUpdateInput } from "@/api_helpers/validations/tripValidation";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma client
const prisma = new PrismaClient();

// Define the PUT handler for updating a trip
export const PUT = async (req, { params }) => {
  try {
    // Extract trip ID from the route parameters
    const tripId = parseInt(params.id);

    // Check if a trip with the provided ID exists
    const existingTrip = await prisma.trip.findUnique({
      where: {
        id: tripId,
        isDeleted: false, // Consider only undeleted trips
      },
    });

    // If the trip doesn't exist, return a not found response
    if (!existingTrip) {
      return sendResponse(NextResponse, 404, false, "Trip not found.");
    }

    // Validate input data for the trip update
    const data = await req.json();
    const { tripName = "", startDate = "", endDate = "", leaderId = "" } = data;

    // Validate user input and check for errors
    const validationErrors = validateTripUpdateInput({
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

    // Update only the provided data in the database
    await prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        tripName: tripName || existingTrip.tripName,
        startDate: new Date(startDate) || existingTrip.startDate,
        endDate: new Date(endDate) || existingTrip.endDate,
        leaderId: parseInt(leaderId) || existingTrip.leaderId,
      },
    });

    // Return a success response after successfully updating the trip
    return sendResponse(
      NextResponse,
      200,
      true,
      "Trip data updated successfully."
    );
  } catch (error) {
    // Handle any errors that occur during the trip update process
    console.error("Error updating trip data:", error);

    // Return an error response for internal server errors
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};

// Define the DELETE handler for deleting a trip
export const DELETE = async (req, { params }) => {
  try {
    // Extract trip ID from the route parameters
    const tripId = parseInt(params.id);

    // Check if a trip with the provided ID exists and is not deleted
    const existingTrip = await prisma.trip.findUnique({
      where: {
        id: tripId,
        isDeleted: false,
      },
    });

    // If the trip doesn't exist or is already deleted, return a not found response
    if (!existingTrip) {
      return sendResponse(NextResponse, 404, false, "Trip not found.");
    }

    // Update the trip in the database to mark it as deleted
    await prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    // Return a success response after successfully marking the trip as deleted
    return sendResponse(NextResponse, 200, true, "Trip deleted successfully.");
  } catch (error) {
    // Handle any errors that occur during the trip deletion process
    console.error("Error deleting trip:", error);

    // Return an error response for internal server errors
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
    // Set default values for pagination
    const queryString = req.url.split('?')[1];
    const page = Number(new URLSearchParams(queryString).get('page')) || 1;
    const limit = Number(new URLSearchParams(queryString).get('limit')) || 10;

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;
    // Fetch participant records for the specified user, ordered by creation date
    const records = await prisma.participant.findMany({
      where: {
        isDeleted: false,
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: skip,
      select: {
        id: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        trip: {
          select: {
            id: true,
            tripName: true,
            startDate: true,
            endDate: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
      // Get the total count of records
      const totalCount = await prisma.participant.count({
        where: {
          isDeleted: false,
          userId: userId,
        },
      });
      // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
    return sendResponse(
      NextResponse,
      200,
      true,
      "Trip data fetched successfully.",
      {
        page,
        totalPages,
        totalCount,
        data: records,
      }
    );
  } catch (error) {
    // Handle any errors that occur during the trip update process
    console.error("Error updating trip data:", error);

    // Return an error response for internal server errors
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
