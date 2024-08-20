import Footer from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar/Navbar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto">
      <Navbar width="1100px" />
      <div className="container mx-auto mt-7 flex min-h-[70vh] max-w-[1100px] flex-col gap-5">
        {children}
      </div>
      <Footer width="1100px" />
    </div>
  );
}
