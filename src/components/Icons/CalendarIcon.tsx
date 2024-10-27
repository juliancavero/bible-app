import { CalendarDaysIcon as Outlined } from "@heroicons/react/24/outline";
import { CalendarDaysIcon as Solid } from "@heroicons/react/24/solid";

type CalendarIconProps = {
  filled?: boolean;
  size?: number;
  className?: string;
};

const CalendarIcon = ({
  filled = false,
  size = 6,
  className,
}: CalendarIconProps) => {
  const Icon = filled ? Solid : Outlined;
  return (
    <Icon
      className={`h-${size} w-${size} stroke-3 stroke-gray-500 dark:stroke-gray-800 ${
        filled && "stroke-1 fill-gray-500 dark:fill-gray-600"
      } ${className}`}
    />
  );
};

export default CalendarIcon;
