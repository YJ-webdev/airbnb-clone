import HostNavbar from "../components/navbar/host-nav";
import { LocalStorageContextProvider } from "../context/local-storage-context";

export default function BecomeAHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto">
      <HostNavbar />
      <LocalStorageContextProvider>{children}</LocalStorageContextProvider>
    </div>
  );
}
