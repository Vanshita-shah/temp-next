"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Filter = () => {
  const [query, setQuery] = useState("");
  const pathName = usePathname();
  const router = useRouter();

  // remove extra spaces from query and add query to URL
  const searchQueryHandler = () => {
    const trimmedQuery = query.trim();
    const value = trimmedQuery.replace(/\s+/g, " ").toLowerCase();
    if (value == "") router.push(`${pathName}`);
    else router.push(`${pathName}?query=${value}`);
  };

  return (
    <div className="relative drop-shadow-md w-[80%] md:w-[60%] mx-auto py-5 ">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        id="input-group-search"
        v-model="searchText"
        type="text"
        className="bg-bg-color border border-gray-300 text-gray-dark text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5  outline-none"
        placeholder="Search by course-name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className=" text-white absolute end-[0px] bottom-[21px] bg-primary hover:bg-primary-dark font-medium rounded-lg text-sm px-4 py-2.5 "
        onClick={searchQueryHandler}
      >
        Search
      </button>
    </div>
  );
};

export default React.memo(Filter);
