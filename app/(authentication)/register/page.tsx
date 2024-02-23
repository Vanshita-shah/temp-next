import RegisterForm from "@/components/form/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();

  //if user is already authenticated
  if (session) {
    redirect("/courses");
  }
  return (
    <>
      <h1 className="text-xl font-bold my-4">Register</h1>
      <RegisterForm />
    </>
  );
};

export default Page;
