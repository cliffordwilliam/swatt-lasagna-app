"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="p-4 pb-0">
        <h1 className="text-3xl font-bold">Order</h1>
        <p className="text-balance text-muted-foreground">
          Lihat, tambah atau edit semua order yang anda miliki.
        </p>
      </div>
      <div className="p-4 pb-0">
        <Button asChild>
          <Link href="/create-order">
            <Plus className="mr-2 h-4 w-4" /> Tambah Order
          </Link>
        </Button>
      </div>
      {/* TODO: OrdersList */}
      {/* <PembelisList getToken={getToken} /> */}
    </>
  );
};

export default Page;
