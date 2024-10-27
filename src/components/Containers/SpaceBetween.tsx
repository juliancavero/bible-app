type SpaceBetweenProps = {
  children: React.ReactNode;
};

const SpaceBetween = ({ children }: SpaceBetweenProps) => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      {children}
    </div>
  );
};

export default SpaceBetween;
