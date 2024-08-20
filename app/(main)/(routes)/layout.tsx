import Footer from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar/Navbar";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto">
      <Navbar width="1280px" />
      <div className="container mx-auto mt-7 flex min-h-[70vh] max-w-[1280px] flex-col gap-5">
        {children}
      </div>
      <Footer width="1280px" />
    </div>
  );
}
