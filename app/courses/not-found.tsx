import Link from "next/link";
import React from "react";

const notFound = () => {
  console.log("***********************************");

  return (
    <>
      <h1>No Access</h1>
      <Link href={"/courses"}>Go Back to courses</Link>
    </>
  );
};

export default notFound;
