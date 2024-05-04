import { isAdmin } from "@/app/actions/cookie";
import { redirect } from "next/navigation";

// Every page in admin needs admin role
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const resIsAdmin = await isAdmin();
  if (!resIsAdmin) {
    redirect("/");
  }

  return <>{children}</>;
};

export default Layout;
