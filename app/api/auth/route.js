// Import necessary dependencies and modules
import { sendResponse } from "@/api_helpers/helpers/responseHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { validateLoginInput } from "@/api_helpers/validations/loginValidation";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTwoFactorToken,
  verifyPassword,
} from "@/api_helpers/helpers/auth";
import { sendEmail } from "@/api_helpers/helpers/mail";
import { APP_URL } from "@/common/config";

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
      return sendResponse(
        NextResponse,
        400,
        false,
        "Validation errors occurred",
        {
          errors: validationErrors,
        }
      );
    }

    // Check if the user with the provided email exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
        isDeleted: false, // Consider only undeleted users
      },
      select:{
        id:true,
        firstName:true,
        lastName: true,
        email:true,
        password:true
      }
    });

    // If the user does not exist, return an error response
    if (!existingUser) {
      return sendResponse(
        NextResponse,
        401,
        false,
        "Invalid email or password."
      );
    }
console.log(password,
  existingUser.password,`password,
  existingUser.password`);
  console.log(existingUser,"existingUser");
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await verifyPassword(
      password,
      existingUser.password
    );

    // If passwords do not match, return an error response
    if (!passwordMatch) {
      return sendResponse(
        NextResponse,
        401,
        false,
        "Invalid email or password."
      );
    }

    const session = {
      id: existingUser.id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
    };

    // Generate access + refresh token + email token for two-factor authentication
    console.log(session,"session");
    console.log(process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET,"process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET");
    const token = await generateAccessToken(session);
    const refreshToken = await generateRefreshToken(session);
    const twoFactorToken = await generateTwoFactorToken(session);

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
          token: refreshToken,
          refreshToken: twoFactorToken,
          isDeleted: false,
          deletedAt: null, // Reset the deleted_at value
        },
      });
    } else {
      // Create a new token record
      await prisma.token.create({
        data: {
          userId: existingUser.id,
          token: refreshToken,
          refreshToken: twoFactorToken,
        },
      });
    }

    // Send email with specified token for two-factor authentication
    sendEmail({
      to: existingUser.email,
      subject: "Verify Your Email",
      text: `Click this link to login...`,
      html: `<a href="${APP_URL}/two-factor?token=${twoFactorToken}">Click here to login</a>`,
    });

    // Return a success response with the created user data
    return sendResponse(
      NextResponse,
      200,
      true,
      "User logged in successfully. Please check your email for login instructions.",
      {
        user: existingUser,
        token,
      }
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
