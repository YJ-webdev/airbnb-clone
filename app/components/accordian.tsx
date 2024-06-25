import { ChevronDown } from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AccordianProps {
  children: ReactNode;
  value: string;
  onChange: (newValue: string | null) => void;
}

interface AccordianItemProps {
  children: ReactNode;
  value: string;
  trigger: string;
}

interface AccordianContextType {
  selected: string | null;
  setSelected: (value: string | null) => void;
}

const AccordianContext = createContext<AccordianContextType | undefined>(
  undefined,
);

export const Accordian = ({
  children,
  value,
  onChange,
  ...props
}: AccordianProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  return (
    <ul {...props}>
      <AccordianContext.Provider value={{ selected, setSelected }}>
        {children}
      </AccordianContext.Provider>
    </ul>
  );
};

export const AccordianItem = ({
  children,
  value,
  trigger,
  ...props
}: AccordianItemProps) => {
  const context = useContext(AccordianContext);

  if (!context) {
    throw new Error("AccordianItem must be used within an Accordian");
  }

  const { selected, setSelected } = context;
  const open = selected === value;

  return (
    <li className="border-b" {...props}>
      <header
        role="button"
        onClick={() => setSelected(open ? null : value)}
        className="flex items-center justify-between p-4 font-medium"
      >
        {trigger}
        <ChevronDown size={16} />
      </header>
      <div className="overflow-y-hidden" style={{ height: open ? "100%" : 0 }}>
        <div className="p-2 pb-4">{children}</div>
      </div>
    </li>
  );
};
