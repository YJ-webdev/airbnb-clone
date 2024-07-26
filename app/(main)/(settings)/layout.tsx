import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar/navbar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto">
      <Navbar width="68rem" />
      {children}
      <Footer width="68rem" />
    </div>
  );
}
