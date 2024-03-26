import { signOut } from "next-auth/react";
import React from "react";
import ModalLayout from "./ModalLayout";

const SessionExpirationPopup = () => {
  return (
    <ModalLayout>
      <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md px-8 py-6 h-[200px] text-center">
        <p className="text-lg font-medium mb-4">
          Oops!!Your session has expired!!.
        </p>
        <button
          onClick={async () => {
            await signOut();
          }}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded inline-block"
        >
          Please login again
        </button>
      </div>
    </ModalLayout>
  );
};

export default SessionExpirationPopup;
