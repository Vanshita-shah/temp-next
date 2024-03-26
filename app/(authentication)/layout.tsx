//layout for authentication group route
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="grid place-items-center h-[100%] ">{children}</div>;
}
