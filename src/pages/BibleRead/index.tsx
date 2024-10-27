import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import Card from "@/components/Containers/Card";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import Star from "@/components/Icons/Star";
import Markdown from "@/components/Text/Markdown";
import SmallText from "@/components/Text/SmallText";
import StrongText from "@/components/Text/StrongText";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BiblePadding } from "@/types/preferences";
import { getAttribution } from "@/utils/bibleVersionAttribution";
import useBibleRead from "./useBibleRead";

const BibleReadPage = () => {
  const {
    book,
    data,
    next,
    onBack,
    onNext,
    chapter,
    isError,
    padding,
    thisBook,
    previous,
    isLoading,
    onPrevious,
    isFavourite,
    toggleFavourite,
  } = useBibleRead();

  const bookName = thisBook ? thisBook.label : book;
  const paddingDefault = padding === BiblePadding.default;
  return (
    <MainContainer key={String(book) + String(chapter)}>
      <IndexBar
        sticky
        text={`${bookName || ""} ${chapter || ""}`}
        onClick={onBack}
      />

      <AnimatedLayout>
        <MainContainer>
          <PaddingBox multiplier={paddingDefault ? 3 : 0}>
            <Card rounded={false}>
              <div className="flex flex-row items-center justify-between p-2">
                <h1 className="text-2xl italic font-bold">
                  {bookName} {chapter}
                </h1>
                <Button variant={"link"} onClick={toggleFavourite}>
                  <Star filled={isFavourite} />
                </Button>
              </div>

              <div className={`mb-5 ${paddingDefault ? "p-2" : "p-0"}`}>
                {data && data?.text ? (
                  <Markdown children={data.text} />
                ) : isLoading ? (
                  <Loading />
                ) : isError ? (
                  <Error />
                ) : (
                  <h1 className="text-xl">
                    El capítulo seleccionado no tiene contenido...{" "}
                    <span className="text-3xl font-bold">todavía.</span>
                  </h1>
                )}
              </div>

              <div className="flex flex-row items-center justify-between p-2">
                {previous && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">
                      {previous.book.label} {previous.chapter}
                    </span>
                    <Button onClick={onPrevious} variant="outline">
                      Anterior
                    </Button>
                  </div>
                )}
                {next && (
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-sm font-bold">
                      {next.book.label} {next.chapter}
                    </span>
                    <Button onClick={onNext} variant="outline">
                      Siguiente
                    </Button>
                  </div>
                )}
              </div>

              <div className={`mt-5 ${paddingDefault ? "p-2" : "p-0"}`}>
                {data && data?.text && (
                  <SmallText muted className="text-right italic">
                    {getAttribution(data.version)}
                  </SmallText>
                )}
              </div>
            </Card>
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default BibleReadPage;

const Loading = () => {
  return (
    <PaddingBox>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3 w-2/3">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
        <div className="flex w-1/3">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </PaddingBox>
  );
};

const Error = () => {
  return (
    <PaddingBox>
      <StrongText className="text-center text-amber-300">
        Hubo un error al cargar el texto del capítulo. Inténtalo de nuevo más
        tarde.
      </StrongText>
    </PaddingBox>
  );
};
