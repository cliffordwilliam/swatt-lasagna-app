"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { deleteSession } from "@/app/actions/cookie";

async function logout() {
  await deleteSession();
  redirect("/sign-in");
}

const Navbar = () => {
  return (
    <>
      <nav className="border-b p-2">
        <Button onClick={logout}>Logout</Button>
      </nav>
    </>
  );
};

export default Navbar;
