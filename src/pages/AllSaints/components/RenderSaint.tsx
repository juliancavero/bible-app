import BodyText from "@/components/Text/BodyText";
import StrongText from "@/components/Text/StrongText";
import { Saint } from "@/types/saints";
import { renderDate } from "@/utils/calendar";
import { useMemo } from "react";

type RenderSaintProps = {
  saint: Saint;
  inverted?: boolean;
};

const RenderSaint = ({ saint, inverted = false }: RenderSaintProps) => {
  const fontSize = getComputedStyle(document.body).getPropertyValue(
    "font-size"
  );
  const columnWidths = useMemo(() => {
    const fontSizeNum = parseInt(fontSize);
    const width = fontSizeNum > 16 ? "w-4/6" : "w-5/6";
    const invertWidth = fontSizeNum > 16 ? "w-2/6" : "w-1/6";
    return {
      width,
      invertWidth,
    };
  }, [fontSize]);

  const saintDate = new Date(
    new Date().getFullYear(),
    saint.month - 1,
    saint.day
  );
  return (
    <div
      className={`rounded-lg ${
        inverted ? "bg-background-alternate" : "bg-muted"
      }`}
    >
      {inverted ? (
        <div className="flex flex-row w-full items-center gap-3">
          <div
            className={`${columnWidths.width} flex flex-col gap-1 text-right`}
          >
            <StrongText>{saint.name}</StrongText>
            <BodyText>{renderDate(saintDate)}</BodyText>
          </div>
          <div className={`${columnWidths.invertWidth}`}>
            <Image src={saint.image} inverted />
          </div>
        </div>
      ) : (
        <div className="flex flex-row w-full items-center gap-3">
          <div className={`${columnWidths.invertWidth}`}>
            <Image src={saint.image} />
          </div>
          <div className={`${columnWidths.width} flex flex-col gap-1`}>
            <StrongText>{saint.name}</StrongText>
            <BodyText>{renderDate(saintDate)}</BodyText>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderSaint;

type ImageProps = {
  src: string | undefined;
  inverted?: boolean;
};

const Image = ({ src, inverted = false }: ImageProps) => {
  return (
    <img
      src={
        src ||
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
      }
      className={`w-full aspect-square object-cover ${
        inverted ? "rounded-tr-lg rounded-br-lg" : "rounded-tl-lg rounded-bl-lg"
      } `}
    />
  );
};
