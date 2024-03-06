"use client";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 w-screen z-10 bg-bg-color flex items-center justify-center h-screen">
      <div className="text-center gap-3 shadow-lg p-10 rounded-lg border-t-4 ">
        <h1 className="text-3xl font-bold mb-4"> 404 - Page Not Found</h1>
        <p className="text-lg mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded inline-block"
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
