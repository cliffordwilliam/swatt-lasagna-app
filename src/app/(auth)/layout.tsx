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

// No need to go here if already have cookie
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = cookies().get("session")?.value;

  if (session) {
    redirect("/");
  }
  return (
    <>
      <main className="min-h-dvh flex items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default Layout;
