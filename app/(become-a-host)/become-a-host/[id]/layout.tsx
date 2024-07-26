import HostNavbar from "./host-nav";

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
