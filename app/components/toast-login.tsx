export const ToastLogin = ({
  children,
  openDialog,
}: {
  children: React.ReactNode;
  openDialog: () => void;
}) => {
  return (
    <button
      onClick={openDialog}
      className="h-12 w-32 rounded-lg bg-rose-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-rose-600"
    >
      {children}
    </button>
  );
};
