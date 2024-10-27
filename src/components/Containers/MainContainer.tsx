type MainContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

const MainContainer = ({ children, className }: MainContainerProps) => {
  return (
    <div className={`flex flex-col flex-1 w-full ${className}`}>{children}</div>
  );
};

export default MainContainer;
