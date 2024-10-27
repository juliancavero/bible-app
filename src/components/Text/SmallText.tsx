type SmallTextProps = {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
};

const SmallText = ({ children, muted = false, className }: SmallTextProps) => {
  return (
    <h3
      className={`text-xs tracking-tight ${
        muted && "text-gray-400"
      } ${className}`}
    >
      {children}
    </h3>
  );
};

export default SmallText;
