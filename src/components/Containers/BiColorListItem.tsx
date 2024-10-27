type BiColorListItemType = {
  colored?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const BiColorListItem = ({
  colored = false,
  children,
  ...props
}: BiColorListItemType) => {
  return (
    <div
      className={`px-2 py-1 cursor-pointer ${
        colored
          ? "bg-background hover:bg-gray-300 dark:hover:bg-gray-700"
          : "bg-background-alternate hover:bg-gray-200 dark:hover:bg-gray-500"
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export default BiColorListItem;
