type BodyTextProps = {
  children: React.ReactNode;
  className?: string;
};

const BodyText = ({ children, className }: BodyTextProps) => {
  return <h3 className={`text-md tracking-tight ${className}`}>{children}</h3>;
};

export default BodyText;
