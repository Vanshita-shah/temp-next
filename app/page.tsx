import Link from "next/link";

const page = async () => {
  return (
    <>
      <div className="bg-bg-color flex items-center justify-center h-[100%]">
        <div className="text-center gap-3 shadow-lg p-10 rounded-lg border-t-4 ">
          <h1 className="text-3xl font-bold mb-4">Welcome to the App</h1>
          <p className="text-lg mb-8">Please login first to utilize the app.</p>
          <Link
            href="/login"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
