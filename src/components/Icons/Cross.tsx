import { XMarkIcon as Outlined } from "@heroicons/react/24/outline";
import { XMarkIcon as Solid } from "@heroicons/react/24/solid";

type CrossProps = {
  filled?: boolean;
  size?: number;
  className?: string;
};

const Cross = ({ filled = false, size = 6, className }: CrossProps) => {
  const Icon = filled ? Solid : Outlined;
  return (
    <Icon
      className={`h-${size} w-${size} stroke-2 stroke-red-600 ${className}`}
    />
  );
};

export default Cross;
