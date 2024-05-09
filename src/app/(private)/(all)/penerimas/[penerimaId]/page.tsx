import { getToken } from "@/app/actions/cookie";
import UpdatePenerima from "@/components/penerima/update-penerima";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Ban } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { penerimaId: string } }) => {
  const token = await getToken();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/penerimas/${params.penerimaId}`,
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
          <Link href="/penerimas">
            <Ban className="mr-2 h-4 w-4" /> Batal / Kembali
          </Link>
        </Button>
      </div>
      <div className="p-4">
        <UpdatePenerima getToken={getToken} data={response.data} />
      </div>
    </>
  );
};

export default Page;
