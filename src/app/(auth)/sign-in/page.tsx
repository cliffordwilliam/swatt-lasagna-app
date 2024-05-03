import SignIn from "@/components/sign-in";
import { setCookie } from "@/app/actions/cookie";

const Page = () => {
  return (
    <>
      <SignIn setCookie={setCookie} />
    </>
  );
};

export default Page;
