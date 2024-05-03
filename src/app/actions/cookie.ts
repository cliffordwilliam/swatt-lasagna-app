"use server";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

interface Payload extends JWTPayload {
  roleName: string;
  expiresAt: Date;
}

interface Role {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface TokenData {
  sub: string;
  username: string;
  role: Role;
  iat: number;
  exp: number;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function setCookie(token: string) {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const tokenData = await decrypt(token);

  if (!isValidTokenData(tokenData)) {
    throw new Error("Invalid token data structure");
  }

  const roleName = tokenData.role.name;

  const payload: Payload = { roleName, expiresAt };

  const session = await encrypt(payload);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

function isValidTokenData(tokenData: any): tokenData is TokenData {
  return (
    tokenData &&
    typeof tokenData === "object" &&
    typeof tokenData.sub === "string" &&
    typeof tokenData.username === "string" &&
    typeof tokenData.role === "object" &&
    typeof tokenData.iat === "number" &&
    typeof tokenData.exp === "number"
  );
}

export async function deleteSession() {
  cookies().delete("session");
}
