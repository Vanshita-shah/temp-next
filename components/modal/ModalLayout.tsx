import React from "react";

const ModalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 bg-opacity-75 flex items-center justify-center z-50">
      {children}
    </div>
  );
};

export default ModalLayout;
