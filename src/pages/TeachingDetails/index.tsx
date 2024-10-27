import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import Card from "@/components/Containers/Card";
import DividerBox from "@/components/Containers/DividerBox";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import Image from "@/components/Misc/Image";
import Markdown from "@/components/Text/Markdown";
import StrongText from "@/components/Text/StrongText";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { translateBook } from "@/lib/BibleBooks";
import { renderDate } from "@/utils/calendar";
import { useMemo } from "react";
import ImageDetailsDialog from "./components/ImageDetailsDialog";
import useTeachingDetails from "./useTeachingDetails";

const TeachingDetailsPage = () => {
  const {
    isLoading,
    isError,
    teaching,
    onBack,
    onAnotherDay,
    contiguousDates,
    imageOpen,
    setImageOpen,
  } = useTeachingDetails();

  const renderBookName = useMemo(() => {
    return translateBook(teaching?.book);
  }, [teaching]);

  return (
    <MainContainer>
      <IndexBar sticky text="Enseñanzas" onClick={onBack} />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox>
            <Card>
              {isLoading && <Loading />}
              {isError && <Error />}
              {teaching && (
                <div>
                  <PaddingBox multiplier={2} className="text-right">
                    <span className="capitalize italic font-extrabold text-2xl">
                      {renderDate(
                        new Date(
                          teaching.year,
                          teaching.month - 1,
                          teaching.day
                        ),
                        true
                      )}
                    </span>
                  </PaddingBox>
                  <PaddingBox multiplier={2}>
                    <StrongText className="italic">
                      {renderBookName} {teaching.chapter}
                    </StrongText>
                  </PaddingBox>
                  <div className="flex flex-col items-center md:block">
                    {teaching.image && (
                      <Image
                        src={teaching.image}
                        alt={teaching.book || ""}
                        className="float-none md:float-right w-4/5 md:w-1/3 md:max-w-96 mb-3 mt-2 md:ml-4"
                        onClick={() => setImageOpen(true)}
                      />
                    )}
                    <Markdown indent={false} children={teaching.text} />
                  </div>
                  {teaching && (
                    <ImageDetailsDialog
                      open={imageOpen}
                      setOpen={setImageOpen}
                      teaching={teaching}
                    />
                  )}
                  <PaddingBox multiplier={2}>
                    <div className="flex flex-row items-center justify-between p-2">
                      {contiguousDates.previous ? (
                        <div className="flex flex-col gap-1">
                          <Button
                            onClick={() => onAnotherDay("previous")}
                            variant="default"
                          >
                            Anterior
                          </Button>
                        </div>
                      ) : (
                        <div />
                      )}
                      {contiguousDates.next ? (
                        <div className="flex flex-col gap-1 text-right">
                          <Button
                            onClick={() => onAnotherDay("next")}
                            variant="default"
                          >
                            Siguiente
                          </Button>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </PaddingBox>
                </div>
              )}
            </Card>
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default TeachingDetailsPage;

const Loading = () => {
  return (
    <DividerBox>
      <PaddingBox>
        <div className="flex gap-3">
          <div className="flex w-1/3">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex flex-col gap-3 w-2/3">
            <Skeleton className="w-full h-14" />
            <Skeleton className="w-full h-14" />
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
          Hubo un error al cargar el Sermón de hoy. Inténtalo de nuevo más
          tarde.
        </StrongText>
      </PaddingBox>
    </DividerBox>
  );
};
