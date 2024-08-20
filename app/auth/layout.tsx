import Footer from "../components/footer";
import { Navbar } from "../components/navbar/Navbar";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
