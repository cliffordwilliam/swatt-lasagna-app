import { redirect } from "next/navigation";
import { decrypt } from "@/app/actions/cookie";
import { cookies } from "next/headers";

interface SessionData {
  roleName: string;
  expiresAt: string;
  iat: number;
  exp: number;
}

const isValidSessionData = (sessionData: any): sessionData is SessionData => {
  return (
    sessionData &&
    typeof sessionData === "object" &&
    typeof sessionData.roleName === "string" &&
    typeof sessionData.expiresAt === "string" &&
    typeof sessionData.iat === "number" &&
    typeof sessionData.exp === "number"
  );
};

// Every page in admin needs admin role
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = cookies().get("session")?.value;
  const decryptedSession = await decrypt(session);

  if (!isValidSessionData(decryptedSession)) {
    redirect("/sign-in");
  }

  if (decryptedSession.roleName === "Admin") {
    redirect("/");
  }

  return <>{children}</>;
};

export default Layout;
