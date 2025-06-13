import jwt from "jsonwebtoken";






const JWT_SECRET = process.env.JWT_SECRET || "default_dev_secret"; // replace with strong secret in production

// Generate JWT token
export function generateToken(payload: object, expiresIn = "6h"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

// Decode and verify JWT token
export function decodeToken<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
