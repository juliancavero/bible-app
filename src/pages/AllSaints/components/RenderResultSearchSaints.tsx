import PaddingBox from "@/components/Containers/PaddingBox";
import StrongText from "@/components/Text/StrongText";
import { Saint } from "@/types/saints";
import { renderDate } from "@/utils/calendar";
import RenderSaint from "./RenderSaint";

type RenderResultSearchSaintsProps = {
  saints: Saint[];
  onSaintSelected: (saint: Saint) => void;
  search: string;
  searchDate: Date | undefined;
};

const RenderResultSearchSaints = ({
  saints,
  onSaintSelected,
  search,
  searchDate,
}: RenderResultSearchSaintsProps) => {
  const renderResultText = search
    ? `para "${search}"`
    : searchDate
    ? `para el ${renderDate(searchDate)}`
    : "";

  return (
    <PaddingBox multiplier={1} className="flex flex-col gap-2">
      {saints && (
        <Box className="bg-secondary">
          <StrongText>Resultados {renderResultText}</StrongText>
        </Box>
      )}
      {saints.length > 0 ? (
        saints.map((saint, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer flex"
              onClick={() => onSaintSelected(saint)}
            >
              <RenderSaint saint={saint} inverted={index % 2 !== 0} />
            </div>
          );
        })
      ) : (
        <Box className="dark:bg-gray-600 bg-gray-200">
          <StrongText>No se encontraron resultados</StrongText>
        </Box>
      )}
    </PaddingBox>
  );
};

export default RenderResultSearchSaints;

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: BoxProps) => {
  return <div className={`rounded-lg px-4 py-2 ${className}`}>{children}</div>;
};
