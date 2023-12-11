import { sign, verify } from "jsonwebtoken";

/**
 * Generates a JSON Web Token (JWT) with the provided payload, secret, and expiration.
 * @param {object} payload - The data to be included in the JWT.
 * @param {string} secret - The secret key used to sign the JWT.
 * @param {string | number} expiresIn - The expiration time for the JWT.
 * @returns {Promise<string>} - A promise resolving to the generated JWT.
 */
export const generateToken = async (payload, secret, expiresIn) => {
  // Use the `sign` function from the 'jsonwebtoken' library to generate the token
  return await sign(payload, secret, { expiresIn });
};

export const verifyToken = async (payload, secret) => {
  try {
    verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        throw err;
      }

      const userDecoded = decoded;
      const userSession = {
        id: userDecoded.id,
        firstName: userDecoded.firstName,
        lastName: userDecoded.lastName,
        email: userDecoded.email,
      };
      return userSession;
    });
  } catch (error) {
    throw error;
  }
};
