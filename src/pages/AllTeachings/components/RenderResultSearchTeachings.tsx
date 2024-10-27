import PaddingBox from "@/components/Containers/PaddingBox";
import StrongText from "@/components/Text/StrongText";
import { Teaching } from "@/types/bible";
import RenderTeaching from "./RenderTeaching";

type RenderResultSearchTeachingsProps = {
  teachings: Teaching[];
  onTeachingSelect: (teaching: Teaching) => void;
  search: string;
  book: string;
};

const RenderResultSearchTeachings = ({
  teachings,
  onTeachingSelect,
  search,
  book,
}: RenderResultSearchTeachingsProps) => {
  const renderResultText = `para "${search || book}"`;

  return (
    <PaddingBox multiplier={1} className="flex flex-col gap-2">
      {teachings && (
        <Box className="bg-secondary">
          <StrongText>Resultados {renderResultText}</StrongText>
        </Box>
      )}
      {teachings.length > 0 ? (
        teachings.map((teaching, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer flex"
              onClick={() => onTeachingSelect(teaching)}
            >
              <RenderTeaching teaching={teaching} inverted={index % 2 !== 0} />
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

export default RenderResultSearchTeachings;

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: BoxProps) => {
  return <div className={`rounded-lg px-4 py-2 ${className}`}>{children}</div>;
};
