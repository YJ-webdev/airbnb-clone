// "use client";

// import {
//   createContext,
//   Dispatch,
//   SetStateAction,
//   useContext,
//   useState,
// } from "react";

// interface LayoutProps {
//   navbarWidth?: string;
//   navbarBgColor?: string;
// }

// interface LayoutContextProps {
//   layoutProps: LayoutProps;
//   setLayoutProps: Dispatch<SetStateAction<LayoutProps>>;
// }

// const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

// export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
//   const [layoutProps, setLayoutProps] = useState<LayoutProps>({});

//   return (
//     <LayoutContext.Provider value={{ layoutProps, setLayoutProps }}>
//       {children}
//     </LayoutContext.Provider>
//   );
// };

// export const useLayout = (): LayoutContextProps => {
//   const context = useContext(LayoutContext);
//   if (!context) {
//     throw new Error("useLayout must be used within a LayoutProvider");
//   }
//   return context;
// };
