import { HorizontalArrow } from "../Icons/Arrows";
import StrongText from "../Text/StrongText";

type IndexBarProps = {
  sticky?: boolean;
  text?: string;
  onClick?: () => void;
};

const IndexBar = ({
  sticky = false,
  text = "Biblia",
  onClick,
}: IndexBarProps) => {
  return (
    <div
      className={`w-full flex flex-row items-center p-3 gap-3 bg-background shadow-lg ${
        sticky && "sticky top-0 z-10"
      }`}
    >
      {!!onClick && <HorizontalArrow onClick={onClick} withButton dir="left" />}

      <StrongText>{text}</StrongText>
    </div>
  );
};

export default IndexBar;
