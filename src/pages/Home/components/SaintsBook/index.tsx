import Card from "@/components/Containers/Card";
import DividerBox from "@/components/Containers/DividerBox";
import TextBox from "@/components/Containers/LimitedLinesBox";
import PaddingBox from "@/components/Containers/PaddingBox";
import Image from "@/components/Misc/Image";
import BodyText from "@/components/Text/BodyText";
import ButtonText from "@/components/Text/ButtonText";
import Link from "@/components/Text/Link";
import Markdown from "@/components/Text/Markdown";
import StrongText from "@/components/Text/StrongText";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSaintsBook from "./useSaintsBook";

const SaintsBook = () => {
  const { isError, isLoading, renderSaint, goToAllSaints, goToTodaysSaint } =
    useSaintsBook();

  return (
    <Card>
      <StrongText>Santoral hoy</StrongText>
      {isLoading && <Loading />}
      {isError && <Error />}
      {renderSaint ? (
        <>
          <DividerBox>
            <PaddingBox>
              <TextBox>
                {renderSaint.image && (
                  <Image
                    src={renderSaint.image}
                    alt={renderSaint.name}
                    onClick={goToTodaysSaint}
                    className="float-right w-5/12 md:w-1/3 max-w-96 ml-4 mb-4"
                  />
                )}
                <Markdown indent={false} children={renderSaint.text} />
              </TextBox>
              <Link className="text-right" onClick={goToTodaysSaint}>
                Seguir leyendo
              </Link>
            </PaddingBox>
          </DividerBox>
          <PaddingBox direction="y">
            <div className="flex flex-col items-center gap-1">
              <Button className="w-full" onClick={goToTodaysSaint}>
                <ButtonText>Leer texto completo</ButtonText>
              </Button>
              <BodyText>o bien...</BodyText>
              <Button
                className="w-50"
                onClick={goToAllSaints}
                variant={"secondary"}
              >
                <ButtonText size="lg">Ver todo el Santoral</ButtonText>
              </Button>
            </div>
          </PaddingBox>
        </>
      ) : (
        <>
          <BodyText>No se encontró información para este día.</BodyText>
          <DividerBox>
            <Button className="my-2 w-full" onClick={goToAllSaints}>
              <ButtonText>Ver el Santoral completo</ButtonText>
            </Button>
          </DividerBox>
        </>
      )}
    </Card>
  );
};

export default SaintsBook;

const Loading = () => {
  return (
    <DividerBox>
      <PaddingBox>
        <div className="flex gap-3">
          <div className="flex flex-col gap-3 w-2/3">
            <Skeleton className="w-full h-14" />
            <Skeleton className="w-full h-14" />
          </div>
          <div className="flex w-1/3">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </PaddingBox>
    </DividerBox>
  );
};

const Error = () => {
  return (
    <DividerBox>
      <PaddingBox>
        <StrongText className="text-center text-amber-300">
          Hubo un error al cargar el santoral de hoy. Inténtalo de nuevo más
          tarde.
        </StrongText>
      </PaddingBox>
    </DividerBox>
  );
};
