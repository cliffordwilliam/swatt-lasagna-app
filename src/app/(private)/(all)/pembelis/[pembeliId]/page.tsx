import { getToken } from "@/app/actions/cookie";
import axios from "axios";
import { redirect } from "next/navigation";
import UpdatePembeli from "@/components/pembeli/update-pembeli";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ban } from "lucide-react";

const Page = async ({ params }: { params: { pembeliId: string } }) => {
  const token = await getToken();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/pembelis/${params.pembeliId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response?.data) {
    redirect("/sign-in");
  }
  return (
    <>
      <div className="p-4 pb-0">
        <Button asChild>
          <Link href="/pembelis">
            <Ban className="mr-2 h-4 w-4" /> Batal / Kembali
          </Link>
        </Button>
      </div>
      <div className="p-4">
        <UpdatePembeli getToken={getToken} data={response.data} />;
      </div>
    </>
  );
};

export default Page;
