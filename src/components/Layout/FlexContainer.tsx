type FlexContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

const FlexContainer = ({ className = "", children }: FlexContainerProps) => {
  return <div className={`flex flex-col ${className}`} children={children} />;
};

export default FlexContainer;
