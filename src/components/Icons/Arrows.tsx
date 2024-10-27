import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const ArrowLeft = (
  <ArrowLeftIcon className="stroke-2 h-6 w-6 text-black dark:text-zinc-200" />
);
const ArrowRight = (
  <ArrowRightIcon className="stroke-2 h-6 w-6 text-black dark:text-zinc-200" />
);
const ChevronUp = (
  <ChevronUpIcon className="stroke-2 h-6 w-6 text-black dark:text-zinc-200" />
);
const ChevronDown = (
  <ChevronDownIcon className="stroke-2 h-6 w-6 text-black dark:text-zinc-200" />
);

type ArrowIconProps = {
  withButton?: boolean;
  onClick?: () => void;
  dir?: "left" | "right";
};

const HorizontalArrow = ({
  withButton = false,
  dir = "left",
  onClick = undefined,
}: ArrowIconProps) => {
  if (withButton) {
    return (
      <div onClick={onClick}>
        <>{dir === "left" ? ArrowLeft : ArrowRight}</>
      </div>
    );
  }
  return <>{dir === "left" ? ArrowLeft : ArrowRight}</>;
};

type VerticalArrowIconProps = {
  withButton?: boolean;
  onClick?: () => void;
  dir?: "up" | "down";
};

const VerticalArrow = ({
  withButton = false,
  dir = "down",
  onClick = undefined,
}: VerticalArrowIconProps) => {
  if (withButton) {
    return (
      <div onClick={onClick}>
        <>{dir === "up" ? ChevronUp : ChevronDown}</>
      </div>
    );
  }
  return <>{dir === "up" ? ChevronUp : ChevronDown}</>;
};

export { HorizontalArrow, VerticalArrow };
