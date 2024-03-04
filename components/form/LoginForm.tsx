"use client";
import Button from "@/components/form/Button";
import ErrorMsg from "@/components/form/ErrorMsg";
import SignInWithGoogle from "@/components/form/SignInWithGoogle";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    // SignIn using credentials-provider from nextAuth
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // if login successfull redirect to dashboard page
      router.replace("/courses");
    }
  };

  return (
    <form action={handleLogin} className="flex flex-col ">
      <label htmlFor="email" className="mt-3">
        Email <span>*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="enter email"
        required
      />
      <label htmlFor="password" className="mt-3">
        Password <span>*</span>
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="enter password"
        required
      />

      {error && <ErrorMsg error={error} />}

      <Button text={"Login"} />

      <SignInWithGoogle />

      <Link className="text-sm mt-3 text-right" href={"/register"}>
        Dont have an account? <span className="underline">Register</span>
      </Link>
    </form>
  );
};

export default LoginForm;
