type ButtonTextProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
};

const ButtonText = ({
  size = "xl",
  className = "",
  children,
}: ButtonTextProps) => {
  return (
    <h1
      className={`text-${size} md:text-3xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h1>
  );
};

export default ButtonText;
