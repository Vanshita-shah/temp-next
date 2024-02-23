"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const Button = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        disabled={pending}
        className="bg-primary hover:bg-primary-dark text-white font-bold cursor-pointer px-6 py-2 mt-5 disabled:bg-primary-light"
      >
        {pending ? "Wait..." : `${text}`}
      </button>
    </>
  );
};

export default Button;
