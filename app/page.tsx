import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();

  //Redirect Authenticated user to dashboard page
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center gap-3 shadow-lg p-10 rounded-lg border-t-4 ">
        <h1 className="text-3xl font-bold mb-4">Welcome to the App</h1>
        <p className="text-lg mb-8">Please login first to utilize the app.</p>
        <Link
          href="/login"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default page;
