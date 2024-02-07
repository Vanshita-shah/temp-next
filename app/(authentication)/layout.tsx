//layout for authentication group route
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid place-items-center h-[100%] ">
      <div className="gap-3 shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
        {children}
      </div>
    </div>
  );
}
