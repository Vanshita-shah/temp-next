"use client";
import Button from "@/components/form/Button";
import ErrorMsg from "@/components/form/ErrorMsg";
import SignInWithGoogle from "@/components/form/SignInWithGoogle";
import UserProfile from "@/components/form/UserProfile";
import { registerAction } from "@/app/utils/action";
import Link from "next/link";

import { useFormState } from "react-dom";

const RegisterForm = () => {
  // Server Actions with useFormState : for state management and error handling
  const [state, formAction] = useFormState(registerAction, { message: "" });

  return (
    <form action={formAction} className="flex flex-col ">
      <label htmlFor="profile" className="mt-3">
        Profile <span>*</span>
        <span className="text-gray-400 text-sm">.png/.jpg/.jpeg</span>
      </label>
      <UserProfile />
      <label htmlFor="name" className="mt-3">
        Name <span>*</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="enter name"
        required
      />
      {state.name && <ErrorMsg error={state.name} />}

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
      {state.email && <ErrorMsg error={state.email} />}
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
      {state.password && <ErrorMsg error={state.password} />}

      {state.message && <ErrorMsg error={state.message} />}

      <Button text="register" />

      <SignInWithGoogle />

      <Link className="text-sm mt-3 text-right" href={"/login"}>
        Already have an account? <span className="underline">Login</span>
      </Link>
    </form>
  );
};

export default RegisterForm;
