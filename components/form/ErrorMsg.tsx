import React from "react";

const ErrorMsg = ({ error }: { error: string }) => {
  return <p className="text-red-500  text-right ">{error}</p>;
};

export default ErrorMsg;
