type CardProps = {
  children?: React.ReactNode;
  className?: string;
  padding?: number;
  rounded?: boolean;
};

const Card = ({
  padding = 4,
  children,
  rounded = true,
  className = "",
}: CardProps) => {
  return (
    <div
      className={`p-${padding} bg-background ${
        rounded && "rounded-lg"
      } shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
