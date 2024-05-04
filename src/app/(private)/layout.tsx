import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import { isAuthenticated } from "../actions/cookie";
import { isAdmin } from "../actions/cookie";

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
