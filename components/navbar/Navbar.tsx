import Link from "next/link";

import NavMenu from "./NavMenu";
import { IUser } from "@/types/types";
import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";
const Navbar = async () => {
  const session = await getServerSession();

  const getUser = async () => {
    if (session?.user.email) {
      const res = await fetch(
        `${process.env.BASE_URL}/api/users?email=${session.user.email}`
      );
      const data: { user: IUser } = await res.json();
      const id = data.user._id;
      return id;
    }
  };
  const id = await getUser();

  return (
    <>
      <div className="flex justify-between items-center h-[4rem] px-10 bg-primary nav fixed top-0 w-full z-10">
        <div>
          <Link href="/" className="text-white text-lg font-semibold">
            CourseApp
          </Link>
        </div>
        {id && <NavMenu userId={id} />}
      </div>
    </>
  );
};

export default Navbar;
