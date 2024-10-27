import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import Card from "@/components/Containers/Card";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import Star from "@/components/Icons/Star";
import Image from "@/components/Misc/Image";
import Markdown from "@/components/Text/Markdown";
import StrongText from "@/components/Text/StrongText";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ImageDetailsDialog from "./components/ImageDetailsDialog";
import useSaintDetails from "./useSaintDetails";

const SaintDetailsPage = () => {
  const {
    data,
    onBack,
    isError,
    isLoading,
    imageOpen,
    todaysDate,
    isFavourite,
    setImageOpen,
    toggleFavourite,
    onNotificationRequest,
  } = useSaintDetails();

  return (
    <MainContainer>
      <IndexBar sticky text={data ? data.name : "Santoral"} onClick={onBack} />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox>
            <PaddingBox multiplier={2}>
              <h3 className="text-2xl text-right font-bold capitalize">
                {todaysDate.toLocaleDateString("es-ES", {
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </h3>
            </PaddingBox>
            <Card>
              {isLoading && <Loading />}
              {isError && <Error />}
              {data ? (
                <div key={data.id} className="px-2">
                  <div className="grid grid-cols-12 items-center md:mb-3">
                    <StrongText extra className="italic capitalize col-span-8">
                      {data.name}
                    </StrongText>
                    <div className="flex flex-row gap-1 col-span-4 justify-end">
                      <Button
                        className="px-1"
                        variant={"link"}
                        onClick={toggleFavourite}
                      >
                        <Star filled={isFavourite} />
                      </Button>
                      <Button
                        className="px-1"
                        variant={"link"}
                        onClick={onNotificationRequest}
                      >
                        <CalendarIcon filled={true} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:block">
                    {data.image && (
                      <Image
                        src={data.image}
                        alt={data.name}
                        className="float-none md:float-right w-4/5 md:w-1/3 md:max-w-96 mb-3 mt-2 md:ml-4"
                        onClick={() => setImageOpen(true)}
                      />
                    )}
                    <Markdown indent={false} children={data.text} />
                  </div>
                  {data && (
                    <ImageDetailsDialog
                      open={imageOpen}
                      setOpen={setImageOpen}
                      saint={data}
                    />
                  )}
                </div>
              ) : (
                <PaddingBox>
                  <h1 className="text-xl">
                    No se encontró información para este día.
                  </h1>
                </PaddingBox>
              )}
            </Card>
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default SaintDetailsPage;

const Loading = () => {
  return (
    <PaddingBox className="flex flex-col gap-3">
      <Skeleton className="w-full h-8" />
      <div className="flex justify-center">
        <Skeleton className="w-3/5 h-48" />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    </PaddingBox>
  );
};

const Error = () => {
  return (
    <PaddingBox>
      <StrongText className="text-center text-amber-300">
        Hubo un error al cargar este santo. Inténtalo de nuevo más tarde.
      </StrongText>
    </PaddingBox>
  );
};
