import Footer from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar/Navbar";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
