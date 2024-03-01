import Navbar from "@/components/navbar/Navbar";

export default function Layout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Filter /> */}
      <Navbar />
      {modal}
      {children}
    </>
  );
}
