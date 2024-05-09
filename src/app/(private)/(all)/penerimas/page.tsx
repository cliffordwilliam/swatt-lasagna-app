"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PenerimasList from "@/components/penerima/penerimas-list";
import { getToken } from "@/app/actions/cookie";

const Page = () => {
  return (
    <>
      <div className="p-4 pb-0">
        <h1 className="text-3xl font-bold">Penerima</h1>
        <p className="text-balance text-muted-foreground">
          Lihat, tambah atau edit semua penerima yang anda miliki.
        </p>
      </div>
      <div className="p-4 pb-0">
        <Button asChild>
          <Link href="/create-penerima">
            <Plus className="mr-2 h-4 w-4" /> Tambah Penerima
          </Link>
        </Button>
      </div>
      <PenerimasList getToken={getToken} />
    </>
  );
};

export default Page;
