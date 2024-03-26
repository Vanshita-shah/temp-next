import LoginForm from "@/components/form/LoginForm";

const Page = async () => {
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
