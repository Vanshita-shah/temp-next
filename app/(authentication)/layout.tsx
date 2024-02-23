import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//layout for authentication group route
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (session) {
    redirect("/courses");
  }
  return (
    <div className="grid place-items-center h-[100%] ">
      <div className="gap-3 shadow-lg p-5 rounded-lg border-t-4 border-border-color">
        {children}
      </div>
    </div>
  );
}
