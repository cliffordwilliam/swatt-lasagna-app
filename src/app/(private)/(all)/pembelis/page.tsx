"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PembelisList from "@/components/pembeli/pembelis-list";
import { getToken } from "@/app/actions/cookie";

const Page = () => {
  // TODO: Fetch data like items list
  return (
    <>
      <div className="p-4 pb-0">
        <h1 className="text-3xl font-bold">Pembeli</h1>
        <p className="text-balance text-muted-foreground">
          Lihat, tambah atau edit semua pembeli yang anda miliki.
        </p>
      </div>
      <div className="p-4 pb-0">
        <Button asChild>
          <Link href="/create-pembeli">
            <Plus className="mr-2 h-4 w-4" /> Tambah Pembeli
          </Link>
        </Button>
      </div>
      <PembelisList getToken={getToken} />
    </>
  );
};

export default Page;
