"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const Button = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        disabled={pending}
        className="bg-purple-600 text-white font-bold cursor-pointer px-6 py-2 mt-5 disabled:bg-purple-300 "
      >
        {pending ? "Wait..." : `${text}`}
      </button>
    </>
  );
};

export default Button;
