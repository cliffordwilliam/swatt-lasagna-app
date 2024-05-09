import CreatePembeli from "@/components/pembeli/create-pembeli";
import { getToken } from "@/app/actions/cookie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ban } from "lucide-react";

const Page = () => {
  return (
    <>
      <div className="p-4 pb-0">
        <Button asChild>
          <Link href="/pembelis">
            <Ban className="mr-2 h-4 w-4" /> Batal
          </Link>
        </Button>
      </div>
      <div className="p-4">
        <CreatePembeli getToken={getToken} />;
      </div>
    </>
  );
};

export default Page;
