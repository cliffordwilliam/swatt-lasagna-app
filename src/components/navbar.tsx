"use client";

import { deleteSession } from "@/app/actions/cookie";
import { Button } from "./ui/button";
import Burger from "./burger";

async function logout() {
  await deleteSession();
}

const Navbar = ({ resIsAdmin }: { resIsAdmin: boolean }) => {
  return (
    <>
      <nav className="border-b p-4 flex items-center justify-between">
        <Burger resIsAdmin={resIsAdmin} />
        <Button onClick={logout}>Logout</Button>
      </nav>
    </>
  );
};

export default Navbar;
