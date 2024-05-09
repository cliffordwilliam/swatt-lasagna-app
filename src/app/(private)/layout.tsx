import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";
import { isAdmin, isAuthenticated } from "../actions/cookie";

// Everything but sign-in is protected, need session
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const resAuthenticated = await isAuthenticated();
  if (!resAuthenticated) {
    redirect("/sign-in");
  }

  const resIsAdmin = await isAdmin();

  return (
    <>
      <Navbar resIsAdmin={resIsAdmin} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
