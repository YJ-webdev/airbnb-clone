interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="border-b-[1px]">
      <div className="text-md text-center mb-4">{title}</div>
      <div className="font-semibold text-2xl text-zinc-800 mb-2 mt-8">
        {subtitle}
      </div>
    </div>
  );
};
