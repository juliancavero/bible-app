type MarginBoxProps = {
  children?: React.ReactNode;
  direction?: "x" | "y" | "";
  multiplier?: number;
  className?: string;
};

const MarginBox = ({
  children,
  direction = "",
  multiplier = 3,
  className = "",
}: MarginBoxProps) => {
  return (
    <div className={`m${direction}-${multiplier} ${className}`}>{children}</div>
  );
};

export default MarginBox;
