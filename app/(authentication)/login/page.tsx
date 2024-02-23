import LoginForm from "@/components/form/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();

  //if user is already authenticated
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <h1 className="text-xl font-bold my-4">login</h1>
      <LoginForm />
    </>
  );
};

export default Page;
