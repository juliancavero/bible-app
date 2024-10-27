import PaddingBox from "@/components/Containers/PaddingBox";
import StrongText from "@/components/Text/StrongText";
import { Saint } from "@/types/saints";
import { renderDate } from "@/utils/calendar";
import { useCallback, useMemo } from "react";
import RenderSaint from "./RenderSaint";

type RenderContiguousDatesProps = {
  today?: Date;
  saints: Saint[];
  onSaintSelected: (saint: Saint) => void;
};

const RenderContiguousDates = ({
  today = new Date(),
  saints,
  onSaintSelected,
}: RenderContiguousDatesProps) => {
  const orderedSaints = useMemo(() => {
    if (!saints) return [];
    return saints.sort((a: Saint, b: Saint) => {
      return a.month - b.month || a.day - b.day;
    });
  }, [saints]);
  const isSaintInverted = useCallback(
    (saint: Saint) => {
      return orderedSaints.indexOf(saint) % 2 !== 0;
    },
    [orderedSaints]
  );
  const datesExist = useMemo(() => {
    return {
      yesterday: orderedSaints.some(
        (saint) => saint.day === today.getDate() - 1
      ),
      today: orderedSaints.some((saint) => saint.day === today.getDate()),
      tomorrow: orderedSaints.some(
        (saint) => saint.day === today.getDate() + 1
      ),
      afterTomorrow: orderedSaints.some(
        (saint) => saint.day === today.getDate() + 2
      ),
    };
  }, [orderedSaints]);
  const dates = useMemo(() => {
    return {
      yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
      today: today,
      tomorrow: new Date(new Date().setDate(new Date().getDate() + 1)),
      afterTomorrow: new Date(new Date().setDate(new Date().getDate() + 2)),
    };
  }, []);

  return (
    <PaddingBox multiplier={1} className="flex flex-col gap-2">
      {/* {datesExist.yesterday && (
        <Box className="bg-primary mt-2">
          <StrongText extra>Ayer {renderDate(dates.yesterday)}</StrongText>
        </Box>
      )}
      {orderedSaints
        ?.filter((saint) => saint.day === dates.yesterday.getDate())
        .map((saint, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer flex"
              onClick={() => onSaintSelected(saint)}
            >
              <RenderSaint saint={saint} inverted={isSaintInverted(saint)} />
            </div>
          );
        })} */}
      {datesExist.today && (
        <Box className="bg-secondary">
          <StrongText extra>Hoy {renderDate(dates.today)}</StrongText>
        </Box>
      )}
      {orderedSaints
        ?.filter((saint) => saint.day === dates.today.getDate())
        .map((saint, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer flex"
              onClick={() => onSaintSelected(saint)}
            >
              <RenderSaint saint={saint} inverted={isSaintInverted(saint)} />
            </div>
          );
        })}

      {datesExist.tomorrow && (
        <Box className="bg-primary mt-2">
          <StrongText extra>Mañana {renderDate(dates.tomorrow)}</StrongText>
        </Box>
      )}
      {orderedSaints
        ?.filter((saint) => saint.day === dates.tomorrow.getDate())
        .map((saint, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer flex"
              onClick={() => onSaintSelected(saint)}
            >
              <RenderSaint saint={saint} inverted={isSaintInverted(saint)} />
            </div>
          );
        })}

      {datesExist.afterTomorrow && (
        <Box className="bg-primary mt-2">
          <StrongText extra>
            Pasado mañana {renderDate(dates.afterTomorrow)}
          </StrongText>
        </Box>
      )}
      {orderedSaints
        ?.filter((saint) => saint.day === dates.afterTomorrow.getDate())
        .map((saint, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer flex"
              onClick={() => onSaintSelected(saint)}
            >
              <RenderSaint saint={saint} inverted={isSaintInverted(saint)} />
            </div>
          );
        })}
    </PaddingBox>
  );
};

export default RenderContiguousDates;

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: BoxProps) => {
  return (
    <div className={`text-center rounded-lg p-2 ${className}`}>{children}</div>
  );
};
