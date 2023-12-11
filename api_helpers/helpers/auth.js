import bcrypt from "bcrypt";
import { generateToken } from "./jwt";

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
  // Ensure that required environment variables are set
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not set");
  }

  if (!process.env.JWT_ACCESS_TOKEN_EXPIRATION) {
    throw new Error("ACCESS_TOKEN_EXPIRATION is not set");
  }

  return await generateToken(
    payload,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    process.env.JWT_ACCESS_TOKEN_EXPIRATION
  );
};

/**
 * Generates a refresh token for refreshing access tokens.
 * @param {object} payload - The payload to include in the refresh token.
 * @returns {Promise<string>} - A promise resolving to the generated refresh token.
 */
export const generateRefreshToken = async (payload) => {
  // Ensure that required environment variables are set
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("JWT_REFRESH_TOKEN_SECRET is not set");
  }

  if (!process.env.JWT_REFRESH_TOKEN_EXPIRATION) {
    throw new Error("JWT_REFRESH_TOKEN_EXPIRATION is not set");
  }

  return await generateToken(
    payload,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    process.env.JWT_REFRESH_TOKEN_EXPIRATION
  );
};

/**
 * Generates a two-factor authentication token.
 * @param {object} payload - The payload to include in the two-factor token.
 * @returns {Promise<string>} - A promise resolving to the generated two-factor token.
 */
export const generateTwoFactorToken = async (payload) => {
  // Ensure that required environment variables are set
  if (!process.env.JWT_TWO_FACTOR_TOKEN_SECRET) {
    throw new Error("JWT_TWO_FACTOR_TOKEN_SECRET is not set");
  }

  if (!process.env.JWT_TWO_FACTOR_TOKEN_EXPIRATION) {
    throw new Error("JWT_TWO_FACTOR_TOKEN_EXPIRATION is not set");
  }

  return await generateToken(
    payload,
    process.env.JWT_TWO_FACTOR_TOKEN_SECRET,
    process.env.JWT_TWO_FACTOR_TOKEN_EXPIRATION
  );
};
