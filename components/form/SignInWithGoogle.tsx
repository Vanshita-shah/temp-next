"use client";

import { signIn } from "next-auth/react";

const SignInWithGoogle = () => {
  return (
    //SignIn using google provider of NextAuth
    <button
      type="button"
      className="mt-4 bg-bg-color  px-2 py-2 flex items-center justify-center"
      onClick={async () => {
        await signIn("google");
      }}
    >
      Login with Google
      <svg
        className="w-4 h-4 ms-2 fill-gray-color"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 19"
      >
        <path d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" />
      </svg>
    </button>
  );
};

export default SignInWithGoogle;
