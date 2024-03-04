"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "@/types/types";
import { usePathname } from "next/navigation";

// Navigation links for authenticated and unauthenticated users
const unauthentictedLinks = [
  {
    id: 1,
    link: "login",
    href: "/login",
  },
  {
    id: 2,
    link: "register",
    href: "/register",
  },
];

const NavMenu = ({ userId }: { userId?: string }) => {
  const { data: session, status: sessionStatus } = useSession();
  const pathName = usePathname();

  // State for controlling visibility of mobile navigation menu
  const [nav, setNav] = useState(false);

  const imageUrl = session?.user.image || "";

  const authenticatedLinks = [
    {
      id: 1,
      link: "dashboard",
      href: "/courses",
    },
    {
      id: 2,
      link: "my-courses",
      href: `/courses/${userId}`,
    },
    {
      id: 3,
      link: "add-course",
      href: "/courses/add-course",
    },
  ];

  // Determine navlinks based on user session
  const links = session ? authenticatedLinks : unauthentictedLinks;
  return (
    <>
      {/* Desktop navigation menu */}
      <div className="hidden md:flex md:items-center">
        {sessionStatus !== "loading" &&
          links.map(({ id, link, href }) => (
            <Link
              key={id}
              className={`nav-links px-4 cursor-pointer capitalize font-medium text-white hover:underline duration-200 ${
                pathName === href ? "underline" : ""
              }`}
              href={href}
            >
              {link}
            </Link>
          ))}

        {/* Display logout button and user image for authenticated users */}

        {session && (
          <div className="flex flex-1 justify-end gap-10 items-center">
            <button
              className="text-primary bg-primary-light px-3 py-1 hover:bg-border-color hover:text-white "
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </button>
            {imageUrl && (
              <Image
                className=" h-[30px] w-[30px] rounded-full ring-2 ring-white"
                src={imageUrl}
                alt=""
                width={30}
                height={30}
              />
            )}
          </div>
        )}
      </div>

      {/* Mobile menu toggle button */}
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10  md:hidden"
      >
        {nav ? (
          <FaTimes className="text-black" size={30} />
        ) : (
          <FaBars className=" text-white" size={30} />
        )}
      </div>

      {/* Mobile navigation menu */}
      {nav && (
        <div className="grid place-content-center absolute top-0 left-0 w-full h-screen bg-bg-color md:hidden">
          <div className="flex  flex-col justify-center items-center">
            {session && imageUrl && (
              <Image
                className=" h-[80px] w-[80px] rounded-full ring-2 ring-white"
                src={imageUrl}
                alt=""
                width={30}
                height={30}
              />
            )}
            {links.map(({ id, link, href }) => (
              <li
                key={id}
                className={` px-4 cursor-pointer capitalize py-6 text-4xl ${
                  pathName === href ? "underline" : ""
                }`}
              >
                <Link onClick={() => setNav(!nav)} href={href}>
                  {link}
                </Link>
              </li>
            ))}
            {session && (
              <button
                className="py-6 text-4xl w-full"
                onClick={async () => {
                  await signOut();
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavMenu;
