import Footer from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar/navbar";

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
