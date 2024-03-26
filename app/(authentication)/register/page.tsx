import RegisterForm from "@/components/form/RegisterForm";

const Page = async () => {
  return (
    <>
      <div className="w-[80%] min-w-[300px] sm:w-auto gap-3 shadow-lg p-5 rounded-lg border-t-4 border-border-color">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <RegisterForm />
      </div>
    </>
  );
};

export default Page;
