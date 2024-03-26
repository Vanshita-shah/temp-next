import Link from "next/link";

import NavMenu from "./NavMenu";
import { getServerSession } from "next-auth";
import { getUserID } from "@/app/utils/user-services/getUser";
import { authOptions } from "@/app/utils/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user.email!;
  const id = await getUserID(email);

  return (
    <>
      <div className="flex justify-between items-center h-[4rem] px-10 bg-primary nav fixed top-0 w-full z-10">
        <div>
          <Link href="/" className="text-white text-lg font-semibold">
            CourseForge
          </Link>
        </div>
        {<NavMenu userId={id} />}
      </div>
    </>
  );
};

export default Navbar;
