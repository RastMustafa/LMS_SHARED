"use server";

import { decodeToken, generateToken } from "@/utils/generateToken";

export async function createToken(userId: string): Promise<string> {
  const token = generateToken({ userId });
  return token;
}

export async function verifyToken(token: string): Promise<string> {
  const res = decodeToken(token);
  return res;
}
