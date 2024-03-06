import Image from "next/image";
import React from "react";

const NoDataAvailable = () => {
  return (
    <div className="grid place-items-center h-[50%] ">
      <div className="flex flex-col items-center">
        <Image src="/NoData.gif" width="200" height="150" alt="No Data" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-red-400 text-lg mt-5">
          No Data Found
        </span>
      </div>
    </div>
  );
};

export default NoDataAvailable;
