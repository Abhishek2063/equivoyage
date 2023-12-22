import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "./jwt";

/**
 * Verifies a password against its hashed counterpart.
 * @param {string} password - The plain text password to verify.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise resolving to a boolean indicating whether the password is valid.
 */
export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generates an access token for authentication purposes.
 * @param {object} payload - The payload to include in the access token.
 * @returns {Promise<string>} - A promise resolving to the generated access token.
 */
export const generateAccessToken = async (payload) => {
  console.log(payload, "payload");
  console.log(
    process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET,
    "process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET"
  );

  // Ensure that required environment variables are set
  if (!process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not set");
  }

  if (!process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_EXPIRATION) {
    throw new Error("ACCESS_TOKEN_EXPIRATION is not set");
  }

  return await generateToken(
    payload,
    process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET,
    process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_EXPIRATION
  );
};

/**
 * Generates a refresh token for refreshing access tokens.
 * @param {object} payload - The payload to include in the refresh token.
 * @returns {Promise<string>} - A promise resolving to the generated refresh token.
 */
export const generateRefreshToken = async (payload) => {
  // Ensure that required environment variables are set
  if (!process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET is not set");
  }

  if (!process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_EXPIRATION) {
    throw new Error("NEXT_PUBLIC_JWT_REFRESH_TOKEN_EXPIRATION is not set");
  }

  return await generateToken(
    payload,
    process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET,
    process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_EXPIRATION
  );
};

/**
 * Generates a two-factor authentication token.
 * @param {object} payload - The payload to include in the two-factor token.
 * @returns {Promise<string>} - A promise resolving to the generated two-factor token.
 */
export const generateTwoFactorToken = async (payload) => {
  // Ensure that required environment variables are set
  if (!process.env.NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_SECRET) {
    throw new Error("NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_SECRET is not set");
  }

  if (!process.env.NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_EXPIRATION) {
    throw new Error("NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_EXPIRATION is not set");
  }

  return await generateToken(
    payload,
    process.env.NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_SECRET,
    process.env.NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_EXPIRATION
  );
};

export const verifyAccessToken = async (token) => {
  // If environment variable is not set, throw an error
  if (!process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not set");
  }

  try {
    // Wrap the verify function in a promise
    return new Promise((resolve, reject) => {
      verifyToken(token, process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err || !decoded) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

export const verifyTwoFactorToken = (token) => {
  // If environment variable is not set, throw an error
  if (!process.env.NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_SECRET) {
    throw new Error("NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_SECRET is not set");
  }

  return verifyToken(
    token,
    process.env.NEXT_PUBLIC_JWT_TWO_FACTOR_TOKEN_SECRET
  );
};
