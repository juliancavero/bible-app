import { Cog6ToothIcon as Outline } from "@heroicons/react/24/outline";
import { Cog6ToothIcon as Solid } from "@heroicons/react/24/solid";

type SettingsProps = {
  filled?: boolean;
  size?: number;
  className?: string;
};

const Settings = ({ filled = false, size = 6, className }: SettingsProps) => {
  const Icon = filled ? Solid : Outline;
  return (
    <Icon
      className={`h-${size} w-${size} stroke-3 stroke-zinc-300 dark:stroke-zinc-600 ${
        filled && "stroke-1 fill-zinc-200 dark:fill-zinc-400"
      } ${className}`}
    />
  );
};

export default Settings;
