import BodyText from "@/components/Text/BodyText";
import StrongText from "@/components/Text/StrongText";
import { Button } from "@/components/ui/button";
import { AchievementsType } from "@/types/achievements";

type AchievementsDemoProps = {
  achievements: AchievementsType;
  onAllAchievementsClick: () => void;
};

const AchievementsDemo = ({
  achievements,
  onAllAchievementsClick,
}: AchievementsDemoProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center items-center text-center border-r-2 dark:border-gray-300">
          <StrongText extra>{achievements.daysInRow}</StrongText>
          <BodyText>días seguidos</BodyText>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <StrongText extra>{achievements.totalDays}</StrongText>
          <BodyText>días en total.</BodyText>
        </div>
      </div>
      <div className="flex justify-center border-t-2 pt-5 dark:border-gray-300">
        <Button
          size={"lg"}
          variant="secondary"
          onClick={onAllAchievementsClick}
        >
          <h3 className="text-lg">Ver todos mis logros</h3>
        </Button>
      </div>
    </div>
  );
};

export default AchievementsDemo;
