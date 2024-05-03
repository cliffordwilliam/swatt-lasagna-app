import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Everything but sign-in is protected, need session
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = cookies().get("session")?.value;

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-dvh">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
