"use server";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

interface Payload extends JWTPayload {
  roleName: string;
  expiresAt: Date;
  token: string;
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

interface SessionData {
  roleName: string;
  expiresAt: string;
  iat: number;
  exp: number;
  token: string;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const isValidSessionData = (sessionData: any): sessionData is SessionData => {
  return (
    sessionData &&
    typeof sessionData === "object" &&
    typeof sessionData.roleName === "string" &&
    typeof sessionData.expiresAt === "string" &&
    typeof sessionData.iat === "number" &&
    typeof sessionData.exp === "number" &&
    typeof sessionData.token === "string"
  );
};

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
    throw new Error("Failed to verify session");
  }
}

export async function setCookie(token: string) {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const tokenData = await decrypt(token);

  if (!isValidTokenData(tokenData)) {
    throw new Error("Invalid token data structure");
  }

  const roleName = tokenData.role.name;

  const payload: Payload = { roleName, expiresAt, token };

  const session = await encrypt(payload);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  cookies().delete("session");
}

export async function isAdmin() {
  const session = cookies().get("session")?.value;
  const decryptedSession = await decrypt(session);
  if (decryptedSession.roleName === "Admin") {
    return true;
  } else {
    return false;
  }
}

export async function isAuthenticated() {
  const session = cookies().get("session")?.value;
  if (session) {
    return true;
  } else {
    return false;
  }
}

export async function getToken(): Promise<string> {
  const session = cookies().get("session")?.value;
  const decryptedSession = await decrypt(session);

  if (!isValidSessionData(decryptedSession)) {
    throw new Error("Invalid token data structure");
  }

  return decryptedSession.token;
}
