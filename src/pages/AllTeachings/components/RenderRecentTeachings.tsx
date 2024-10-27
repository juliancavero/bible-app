import PaddingBox from "@/components/Containers/PaddingBox";
import StrongText from "@/components/Text/StrongText";
import { Teaching } from "@/types/bible";
import { useCallback, useMemo } from "react";
import RenderTeaching from "./RenderTeaching";

type RenderRecentTeachingsProps = {
  teachings: Teaching[];
  onTeachingSelect: (teaching: Teaching) => void;
};

const RenderRecentTeachings = ({
  teachings,
  onTeachingSelect,
}: RenderRecentTeachingsProps) => {
  const orderedTeachings = useMemo(() => {
    return teachings.sort((a: Teaching, b: Teaching) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });
  }, [teachings]);

  const isTeachingInverted = useCallback(
    (teaching: Teaching) => {
      return orderedTeachings.indexOf(teaching) % 2 !== 0;
    },
    [orderedTeachings]
  );

  return (
    <PaddingBox multiplier={1} className="flex flex-col gap-2">
      {teachings && (
        <Box className="bg-secondary">
          <StrongText>Últimos sermones</StrongText>
        </Box>
      )}
      {orderedTeachings.map((teaching, index) => {
        return (
          <div
            key={index}
            className="cursor-pointer flex"
            onClick={() => onTeachingSelect(teaching)}
          >
            <RenderTeaching
              teaching={teaching}
              inverted={isTeachingInverted(teaching)}
            />
          </div>
        );
      })}
    </PaddingBox>
  );
};

export default RenderRecentTeachings;

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: BoxProps) => {
  return (
    <div className={`text-center rounded-lg p-2 ${className}`}>{children}</div>
  );
};
