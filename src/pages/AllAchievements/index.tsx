import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import Card from "@/components/Containers/Card";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import StrongText from "@/components/Text/StrongText";
import { minutesToGreatTime } from "@/utils/dates";
import { TrophyIcon } from "@heroicons/react/24/outline";
import { XIcon } from "lucide-react";
import useAllAchievements from "./useAllAchievements";

const AllAchievementsPage = () => {
  const { achievements, goBack } = useAllAchievements();
  return (
    <MainContainer>
      <IndexBar text="Mis logros" onClick={goBack} />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox className="flex flex-col gap-3">
            <Card className="flex flex-col gap-2">
              <StrongText extra>Logros de plataforma</StrongText>
              <AchievementScore
                num={achievements.daysInRow}
                text="Días seguidos en la plataforma"
                reverse={false}
              />
              <AchievementScore
                num={achievements.totalDays}
                text="Días totales en la plataforma"
                reverse={true}
              />
            </Card>
            <Card className="flex flex-col gap-2">
              <StrongText extra>La Biblia</StrongText>
              <AchievementScore
                num={achievements.chaptersRead.length}
                text="Capítulos leídos"
                reverse={false}
              />
              <AchievementScore
                num={minutesToGreatTime(achievements.timeReadingBible)}
                text="Tiempo de lectura bíblica"
                reverse={true}
                small
              />

              <AchievementScore
                num={achievements.hasReadWholeBible}
                text="Has leído toda la Biblia"
                reverse={false}
              />
            </Card>
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default AllAchievementsPage;

type AchievementScoreProps = {
  num: boolean | number | string;
  text: string;
  reverse?: boolean;
  small?: boolean;
};

const AchievementScore = ({
  num,
  text,
  reverse = false,
  small = false,
}: AchievementScoreProps) => {
  const RenderScore = ({
    score,
    small = false,
  }: {
    small?: boolean;
    score: number | string | boolean;
  }) => {
    if (typeof score === "boolean") {
      if (score) {
        return (
          <TrophyIcon
            className={`h-10 w-10 text-amber-500 dark:text-amber-400`}
          />
        );
      }
      return <XIcon className="h-10 w-10 text-red-500 dark:text-red-400" />;
    }
    return (
      <h3
        className={`text-center pr-2 text-3xl font-extrabold ${
          small && "text-xl"
        }`}
      >
        {score}
      </h3>
    );
  };
  const RenderText = ({ text }: { text: string }) => {
    return <h1 className="text-lg font-semibold">{text}</h1>;
  };
  const RenderContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex w-full h-16">{children}</div>;
  };
  if (reverse) {
    return (
      <RenderContainer>
        <div
          className={`flex w-4/5 items-center justify-end bg-gray-200 dark:bg-gray-700 px-5 rounded-l-lg`}
        >
          <RenderText text={text} />
        </div>
        <div
          className={`flex w-1/5 items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-r-lg`}
        >
          <RenderScore small={small} score={num} />
        </div>
      </RenderContainer>
    );
  }

  return (
    <RenderContainer>
      <div
        className={`flex w-1/5 items-center justify-center bg-primary dark:bg-gray-600  rounded-l-lg`}
      >
        <RenderScore small={small} score={num} />
      </div>
      <div
        className={`flex w-4/5 items-center justify-start bg-primary dark:bg-gray-600 px-5 rounded-r-lg`}
      >
        <RenderText text={text} />
      </div>
    </RenderContainer>
  );
};
