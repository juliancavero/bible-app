import { Loader2 } from "lucide-react";

type LoaderProps = {
  size?: number;
};

const Loader = ({ size = 50 }: LoaderProps) => {
  return (
    <Loader2
      size={size}
      className="animate-spin text-indigo-800 dark:text-indigo-200"
    />
  );
};

export default Loader;
