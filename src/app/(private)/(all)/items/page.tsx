import ItemsList from "@/components/item/items-list";
import { getToken } from "@/app/actions/cookie";

const Page = () => {
  return (
    <>
      <div className="p-4 pb-0">
        <h1 className="text-3xl font-bold">Items</h1>
        <p className="text-balance text-muted-foreground">
          Lihat semua items yang anda miliki di sini.
        </p>
      </div>
      <ItemsList getToken={getToken} />
    </>
  );
};

export default Page;
