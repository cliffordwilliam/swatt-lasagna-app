import { getToken } from "@/app/actions/cookie";
import CreatePenerima from "@/components/penerima/create-penerima";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="p-4 pb-0">
        <Button asChild>
          <Link href="/penerimas">
            <Ban className="mr-2 h-4 w-4" /> Batal
          </Link>
        </Button>
      </div>
      <div className="p-4">
        <CreatePenerima getToken={getToken} />
      </div>
    </>
  );
};

export default Page;
