type PaperProps = {
  children: React.ReactNode;
  className?: string;
};

const Paper = ({ children, className }: PaperProps) => {
  return (
    <div className={"bg-background rounded-xl drop-shadow-xl p-3 " + className}>
      {children}
    </div>
  );
};

export default Paper;
