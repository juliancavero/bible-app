type PaddingBoxProps = {
  children?: React.ReactNode;
  direction?: "x" | "y" | "";
  multiplier?: number;
  className?: string;
};

const PaddingBox = ({
  children,
  direction = "",
  multiplier = 3,
  className = "",
}: PaddingBoxProps) => {
  return (
    <div className={`p${direction}-${multiplier} ${className}`}>{children}</div>
  );
};

export default PaddingBox;
