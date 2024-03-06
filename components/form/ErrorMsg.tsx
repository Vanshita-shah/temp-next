import React from "react";

const ErrorMsg = ({ error }: { error: string }) => {
  return <p className="text-error text-right ">{error}</p>;
};

export default ErrorMsg;
