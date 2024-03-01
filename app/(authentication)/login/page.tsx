import LoginForm from "@/components/form/LoginForm";
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
      <div className="w-[80%] min-w-[300px] sm:w-auto gap-3 shadow-lg p-5 rounded-lg border-t-4 border-border-color">
        <h1 className="text-xl font-bold my-4">login</h1>
        <LoginForm />
      </div>
    </>
  );
};

export default Page;
