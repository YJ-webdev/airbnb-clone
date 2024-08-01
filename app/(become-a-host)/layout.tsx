import HostNavbar from "../components/navbar/host-nav";

export default function BecomeAHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto">
      <HostNavbar />
      {children}
    </div>
  );
}
