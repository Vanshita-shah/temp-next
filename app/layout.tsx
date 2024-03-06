import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth";
import AuthProvider from "./utils/SessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

// metadata
export const metadata: Metadata = {
  title: "CourseForge",
  description:
    "Forge your learning path with CourseForge, a dynamic platform for discovering, sharing, and accessing selected courses and resources.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  console.log("session,", session);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Session provider  */}
        <AuthProvider session={session}>
          {!session && <Navbar />}
          <div className="pt-[4rem] h-screen overflow-auto">{children}</div>
        </AuthProvider>
        <ToastContainer autoClose={2000} />
      </body>
    </html>
  );
}
