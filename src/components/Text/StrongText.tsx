type StrongTextProps = {
  className?: string;
  children: React.ReactNode;
  extra?: boolean;
};

const StrongText = ({
  className = "",
  children,
  extra = false,
}: StrongTextProps) => {
  return (
    <h1
      className={`text-xl md:text-3xl ${
        extra ? "font-extrabold" : "font-semibold"
      } tracking-tight ${className}`}
    >
      {children}
    </h1>
  );
};

export default StrongText;
