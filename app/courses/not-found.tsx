import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <>
      <div className="bg-bg-color flex items-center justify-center h-[100%]">
        <div className="text-center gap-3 shadow-lg p-10 rounded-lg border-t-4 ">
          <h1 className="text-2xl font-bold mb-4">No Access</h1>
          <Link
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded inline-block"
            href={"/courses"}
          >
            Go Back to courses
          </Link>
        </div>
      </div>
    </>
  );
};

export default notFound;
