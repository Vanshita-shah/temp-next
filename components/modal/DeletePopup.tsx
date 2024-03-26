"use client";
import { deleteAction } from "@/app/utils/actions/courseAction";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { DeletePopUpProps } from "@/types/types";
import { useState } from "react";
import ModalLayout from "./ModalLayout";

const DeletePopup = ({ id, courseName, setShowPopUp }: DeletePopUpProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // call delete server action
  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      const res = await deleteAction(id, courseName);
      if (res.message === "Course Deleted Successfully!") {
        toast.success(res.message, {
          className: "toast-message",
        });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <ModalLayout>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 ">
        {!isLoading ? (
          <div className="relative p-4 w-full max-w-md h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
              <button
                className="text-gray-light absolute top-2.5 right-2.5 bg-transparent hover:bg-bg-color hover:text-text-gray rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => setShowPopUp(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-light 0 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"></path>
              </svg>
              <p className="mb-4 text-gray-color ">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  className="py-2 px-3 text-sm font-medium text-gray-color bg-white rounded-lg border border-gray-light hover:bg-bg-color  "
                  onClick={() => setShowPopUp(false)}
                >
                  No, cancel
                </button>
                <button
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-dark "
                  onClick={deleteHandler}
                >
                  Yes, I am sure
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </ModalLayout>
  );
};

export default DeletePopup;
