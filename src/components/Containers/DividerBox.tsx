type DividerBoxProps = {
  children: React.ReactNode;
  margin?: number;
  top?: boolean;
  bottom?: boolean;
};

const DividerBox = ({
  margin = 4,
  top = true,
  bottom = true,
  children,
}: DividerBoxProps) => {
  return (
    <div
      className={`${top && "border-t"} ${
        bottom && "border-b"
      } border-gray-300 dark:border-gray-700 my-${margin} py-2`}
    >
      {children}
    </div>
  );
};

export default DividerBox;
