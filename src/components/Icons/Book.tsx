import { BookOpenIcon as Outline } from "@heroicons/react/24/outline";
import { BookOpenIcon as Solid } from "@heroicons/react/24/solid";

type BookProps = {
  filled?: boolean;
  size?: number;
  className?: string;
};

const Book = ({ filled = false, size = 6, className }: BookProps) => {
  const Icon = filled ? Solid : Outline;
  return (
    <Icon
      className={`h-${size} w-${size} stroke-3 stroke-gray-300 dark:stroke-gray-600 ${
        filled && "stroke-1 fill-gray-200 dark:fill-gray-400"
      } ${className}`}
    />
  );
};

export default Book;
