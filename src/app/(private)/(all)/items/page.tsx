import ItemsList from "@/components/items-list";
import { getToken } from "@/app/actions/cookie";

const Page = () => {
  return (
    <>
      <ItemsList getToken={getToken} />
    </>
  );
};

export default Page;
