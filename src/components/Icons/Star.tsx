import { StarIcon as Outline } from "@heroicons/react/24/outline";
import { StarIcon as Solid } from "@heroicons/react/24/solid";

type StarProps = {
  filled?: boolean;
  size?: number;
  className?: string;
};

const Star = ({ filled = false, size = 6, className }: StarProps) => {
  const Icon = filled ? Solid : Outline;
  return (
    <Icon
      className={`h-${size} w-${size} stroke-3 stroke-yellow-300 dark:stroke-yellow-600 ${
        filled && "stroke-1 fill-yellow-200 dark:fill-yellow-400"
      } ${className}`}
    />
  );
};

export default Star;
